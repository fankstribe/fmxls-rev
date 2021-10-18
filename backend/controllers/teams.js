const { deleteImage } = require('../helpers/save-image')
const Team = require('../models/team')
const User = require('../models/user')
const Manager = require('../models/manager')
const Player = require('../models/player')

const getTeams = async(req, res) => {
  const teams = await Team.find().populate("user", "name")
  return res.status(200).json({
    msg: "Team trovati.",
    teams
  })
}

const createTeam = async(req, res) => {
  const team = new Team(req.body)
  try {
    const teamDB = await team.save()
    return res.status(200).json({
      msg: "Team creato.",
      team: teamDB
    })
  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}

const deleteTeam = async(req, res) => {
  const id = req.params.id
  try {
    const team = await Team.findById(id)
    const player = await Player.find({team: id})
    const pathView = `./uploads/teams/${team.img}`
    if (!team) {
      return res.status(402).json({
        msg: "Squadra non trovata.",
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

    if (player) {
      await Player.updateMany({team: id}, {team: null})
    }

    res.json({
      msg: "Squadra eliminata",
      status: 200
    })
  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}

const updateTeam = async(req, res = response) => {
  const id = req.params.id
  try {
    const team = await Team.findById(id)
    if (!team) {
      return res.status(402).json({
        msg: "Squadra non trovata.",
        id
      })
    }
    const teamDB = { ...req.body }

    const updateTeam = await Team.findByIdAndUpdate(id, teamDB, {
      new: true
    })

    res.json({
      team: updateTeam,
      status: 200
    })
  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}

module.exports = {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
}
