const { response } = require('express')

const { deleteImage } = require('../helpers/save-image')

const Team = require('../models/team')
const User = require('../models/user')
const Manager = require('../models/manager')

const getTeams = async(req, res = response) => {

  const teams = await Team.find().populate("user", "name")

  res.json({
    ok: true,
    teams
  })
}

const createTeam = async(req, res = response) => {

  const team = new Team(req.body)

  try {

    const teamDB = await team.save()

    res.json({
      ok: true,
      team: teamDB
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

const deleteTeam = async(req, res = response) => {
  const id = req.params.id

  try {
    const team = await Team.findById(id)
    const pathView = `./uploads/teams/${team.img}`

    if (!team) {
      return res.status(404).json({
        ok: true,
        msg: 'Squadra non trovata',
        id
      })
    }

    if (team.img) {
      await deleteImage(pathView)
    }

    if (team.user) {
      await  User.findByIdAndUpdate(team.user, {assignedTeam: false})
      await  Manager.deleteOne({user: team.user})
      await  Team.findByIdAndDelete(id)
    } else {
      await Team.findByIdAndDelete(id)
    }

    res.json({
      ok: true,
      msg: 'Squadra eliminata'
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Errore inatteso'
    })
  }
}

const updateTeam = async(req, res = response) => {
  const id = req.params.id

  try {
    const team = await Team.findById(id)

    if (!team) {
      return res.status(404).json({
        ok: true,
        msg: 'Squadra non trovata',
        id
      })
    }

    const teamDB = { ...req.body }

    const updateTeam = await Team.findByIdAndUpdate(id, teamDB)

    res.json({
      ok: true,
      team: updateTeam
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

module.exports = {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
}
