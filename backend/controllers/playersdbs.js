const { response } = require('express');

const { searchFifa } = require('../helpers/scrape')

const Player = require('../models/player');
const Playerdbs = require('../models/playerdbs');

const createPlayersDB = async(req, res = response) => {

  const source = new Playerdbs(req.body)
  let playersDB

  try {

    await source.save()

    switch(req.body.source) {
      case 'sofifa':
       playersDB = await searchFifa()
       console.log(req.body)
       break
    }

    const players = await Player.insertMany(playersDB)

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
