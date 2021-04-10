const { response } = require('express')

const { searchFifa } = require('../helpers/scrape')

const Player = require('../models/player');

const createPlayersDB = async(req, res = response) => {

  const source = req.body
  console.log(source)
  const players = ''
  const playersDB = ''

  try {

    if (source === 'sofifa') {

      playersDB = await searchFifa()

    }

      players = await Player.insertMany(playersDB)

    res.json({
      ok: true,
      players,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    });
  }
}

module.exports = {
  createPlayersDB
}
