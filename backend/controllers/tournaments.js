const { response } = require('express')

const roundRobin = require('roundrobin')
const shuffle = require('shuffle-array')

const { deleteImage } = require('../helpers/save-image')

const Tournament = require('../models/tournament')
const Match = require('../models/match')

// shuffle = (array) => {
//   let curIndex = array.length
//   let tempValue
//   let randomIndex
//   while (0 !== curIndex) {
//     randomIndex = Math.floor(Math.random() * curIndex)
//     curIndex -= 1
//     tempValue = array[curIndex]
//     array[curIndex] = array[randomIndex]
//     array[randomIndex] = tempValue
//   }
//   return array
// }

const getTournaments = async(req, res = response) => {

  const tournaments = await Tournament.find()
    .populate("teams", "teamName img")
    .populate("matches")

  res.json({
    ok: true,
    tournaments
  })
}

const getTournament = async (req, res = response) => {
  const _id = req.params._id

  const tournament = await Tournament.findOne({_id: _id})
    .populate({
      path: 'matches', 
      select: '-tournament',
      populate: [
        { path: 'homeTeam', select: 'teamName img' },
        { path: 'awayTeam', select: 'teamName img' }
      ]    
    })

    res.json({
      ok: true,
      tournament
    })
}

const createTournament = async(req, res = response) => {
  const body = req.body

  try {
    const tournament = new Tournament(body)
    const createMatches = roundRobin(tournament.teams.length, tournament.teams)
    let i
    for (i = 1; i <= 1; i++) {
      const matchesArr = createMatches.reduce((matches, match) => {
        match.map(m => {
          let awayTeam, homeTeam
          if (i % 2 === 0) {
            awayTeam = m[0]
            homeTeam = m[1]
          } else {
            awayTeam = m[1]
            homeTeam = m[0]
          }

          const match = new Match({
            tournament: tournament._id,
            homeTeam: homeTeam._id,
            awayTeam: awayTeam._id,
            round: i
          })
          matches.push(match)
        })
        return matches
      }, [])

      const randomArray = shuffle(matchesArr)
      randomArray.map(match => {
        match.save()
        tournament.matches = tournament.matches.concat(match._id)
      })
    }

    const tournamentDB = await tournament.save()

    res.json({
      ok: true,
      tournaments: tournamentDB
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

const updateTournament = async(req, res = response) => {
  const id = req.params.id

  try {
    const tournament = await Tournament.findById(id)

    if (!tournament) {
      return res.status(404).json({
        ok: true,
        msg: 'Torneo non trovato',
        id
      })
    }

    const tournamentDB = { ...req.body }

    const updateTournament = await Tournament.findByIdAndUpdate(id, tournamentDB)

    res.json({
      ok: true,
      tournament: updateTournament
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

const deleteTournament = async(req, res = response) => {
  const id = req.params.id

  try {
    const tournament = await Tournament.findById(id)
    const pathView = `./uploads/tournaments/${tournament.img}`

    if (!tournament) {
      return res.status(404).json({
        ok: true,
        msg: 'Torneo non trovato',
        id
      })
    }

    if (tournament.img) {
      await deleteImage(pathView)
    }

    await Tournament.findByIdAndDelete(id)


    res.json({
      ok: true,
      msg: 'Torneo eliminato'
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Errore inatteso'
    })
  }
}

module.exports = {
  getTournaments,
  getTournament,
  createTournament,
  updateTournament,  
  deleteTournament
}
