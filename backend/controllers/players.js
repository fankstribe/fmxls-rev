const { response } = require('express')

const { searchFifa } = require('../helpers/scrape')


const getPlayers = async(req, res = response) => {

  try {

    const players = await searchFifa()

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
  getPlayers
}
