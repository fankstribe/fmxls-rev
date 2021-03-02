const { response } = require("express")

const Manager = require("../models/manager")
const Team = require("../models/team")
const User = require("../models/user")

const getManagers = async (req, res = response) => {
  const managers = await Manager.find()
    .populate("user", "name img")
    .populate("team", "teamName")

  res.json({
    ok: true,
    managers,
  })
}

const getManager = async (req, res = response) => {

  const userId = req.params.user

  const manager = await Manager.findOne({user: userId})
    .populate("team", "teamName img")


  res.json({
    ok: true,
    manager
  })
}

const createManager = async (req, res = response) => {
  const teamId = req.body.team
  const userId = req.body.user
  const manager = new Manager(req.body)

  try {
    const managerDB = await Promise.all([
      Team.findByIdAndUpdate(teamId, {user: userId}),
      User.findByIdAndUpdate(userId, {assignedTeam: true}),
      await manager.save()
    ])

    res.json({
      ok: true,
      manager: managerDB,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

const updateManager = async(req, res = response) => {
  const id = req.params.id
  const teamId = req.body.team

  try {
    const teamDB =  await Manager.findById(id)

    if (!teamDB) {
      return res.status(404).json({
        ok: false,
        msg: "Manager non trovato"
      })
    }

    const managerDB = await Promise.all([
      Team.findByIdAndUpdate(teamDB.team, {$unset: {user: ''}}),
      Team.findByIdAndUpdate(teamId, {user: teamDB.user}),
      Manager.findByIdAndUpdate(id, {team: teamId})
    ])


    res.json({
        ok: true,
        manager: managerDB,
      })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }

}

const deleteManager = async(req, res = response) => {

  const id = req.params.id
  try {

    const teamId =  await Manager.findById(id)

    if (!teamId) {
      return res.status(404).json({
        ok: false,
        msg: "Manager non trovato"
      })
    }

    await Team.findByIdAndUpdate(teamId.team, {$unset: {user: ''}})
    await User.findByIdAndUpdate(teamId.user, {assignedTeam: false})

    await Manager.findByIdAndDelete(id)

    res.json({
      ok: true,
      teamId
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

module.exports = {
  getManagers,
  getManager,
  createManager,
  updateManager,
  deleteManager,
}
