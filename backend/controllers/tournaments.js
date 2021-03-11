const { response } = require('express')

const { deleteImage } = require('../helpers/save-image')

const Tournament = require('../models/tournament')
const Match = require('../models/match')

shuffle = (array) => {
  let curIndex = array.length
  let tempValue
  let randomIndex
  while (0 !== curIndex) {
    randomIndex = Math.floor(Math.random() * curIndex)
    curIndex -= 1
    tempValue = array[curIndex]
    array[curIndex] = array[randomIndex]
    array[randomIndex] = tempValue
  }
  return array
}

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
  const id = req.params.id

  const tournament = await Tournament.findOne({_id: id})
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
    const teams = tournament.teams

    const firstRound = []
    const secondRound = []

    const teamList = shuffle(teams)
    const numOfTeams = teamList.length

    const homeTeam = [] = teamList.slice(0, numOfTeams/2)
    const awayTeam = [] = teamList.slice(numOfTeams/2, numOfTeams)

    for (let i = 0; i < numOfTeams - 1; i++) {
      for (let j = 0; j < homeTeam.length; j++) {
        const teamItem = shuffle([homeTeam[j], awayTeam[j]])
        const round = i + 1

        firstRound.push({
          tournament: tournament._id,
          awayTeam: teamItem[1],
          homeTeam: teamItem[0],
          round
        })

        secondRound.push({
          tournament: tournament._id,
          awayTeam: teamItem[0],
          homeTeam: teamItem[1],
          round: round + numOfTeams - 1
        })
      }

      const fixedTeam = homeTeam.shift()
      homeTeam.unshift(awayTeam.shift())
      homeTeam.unshift(fixedTeam)
      awayTeam.push(homeTeam.pop())

    }

    const fixture = firstRound.concat(secondRound)

    const fixtureData = [... fixture]

    for (let fixtureDataItem in fixtureData) {
      await new Match(fixtureData[fixtureDataItem]).save().then((data) => {
        tournament.matches = tournament.matches.concat(data._id)
      })
    }

    await tournament.save()

    res.json({
      ok: true,
      tournament
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
    await Match.deleteMany({tournament: id})


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
