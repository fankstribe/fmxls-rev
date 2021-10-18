const { response } = require("express")

const Player = require("../models/player")
const Playerdbs = require("../models/playerdbs")

const getPosition = async (req, res = response) => {
  try {
    const position = await Player.distinct('position')

    res.json({
      ok: true,
      position,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

const getPlayers = async (req, res = response) => {
  try {
    const players = await Player.find().lean()
      .populate({ path: 'team' })

    res.json({
      ok: true,
      players,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

const updatePlayer = async (req, res = response) => {
  const id = req.params.id
  const fields = req.body
  try {
    const playerDB = await Player.findById(id)
    if (!playerDB) {
      return res
        .status(402)
        .send({ msg: "Non esiste nessuna squadra con questo id" })
    }

    const playerUpdated = await Player.findByIdAndUpdate(id, fields, {
      new: true
    })
    .populate('team')

    res.json({
      player: playerUpdated,
      status: 200
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}

const deletePlayer = async (req, res) => {
  const id = req.params.id
  console.log(id)

  try {
    const player = await Player.findById(id)
    if (!player) {
      return res.status(402).json({
        msg: "Giocatore non trovato.",
        id,
      })
    }

    const playerSource = await Player.findByIdAndDelete(id)
    const countDocs = await Player.find().countDocuments()

    await Playerdbs.updateOne(
      { source: playerSource.source },
      { countPlayers: countDocs }
    )

    res.json({
      msg: "Giocatore eliminato",
      status: 200,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}


module.exports = {
  getPlayers,
  getPosition,
  updatePlayer,
  deletePlayer,
}
