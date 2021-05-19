const { response } = require('express')

const Player = require('../models/player');
const Playerdbs = require('../models/playerdbs')

const getPlayers = async(req, res = response) => {

  try {

    const players = await Player.find().lean()

    res.json({
      ok: true,
      players

    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    });
  }
}

const deletePlayer = async(req, res) => {
  const id = req.params.id

  try {
    const player = await Player.findById(id)
    if (!player) {
      return res.status(402).json({
        msg: "Giocatore non trovato.",
        id
      })
    }

    const playerSource = await Player.findByIdAndDelete(id)
    const countDocs = await Player.find().countDocuments()

    await Playerdbs.updateOne({source: playerSource.source}, {countPlayers: countDocs})


    res.json({
      msg: "Giocatore eliminato",
      status: 200
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}

module.exports = {
  getPlayers,
  deletePlayer
}
