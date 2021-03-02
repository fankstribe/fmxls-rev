const { response } = require('express')

const Tournament = require('../models/tournament')



const createMatch = async(req, res = response) => {

  const tournamentId = req.body.tournamentId

  try {

    const tournament = await Tournament.findById(tournamentId)

    res.json({
      ok: true,
      msg: 'matches'
    })


  } catch (error) {

  }
}

module.exports = {
  createMatch
}
