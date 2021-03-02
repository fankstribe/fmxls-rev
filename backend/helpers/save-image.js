const fs = require('fs')

const User = require('../models/user')
const Team = require('../models/team')
const Tournament = require('../models/tournament')

const deleteImage = async(path) => {
  if (fs.existsSync(path)) {

    // Cancella l'immagine precedente
    fs.unlinkSync(path)
  }
}

const saveImage = async(type, id, fileName) => {

  let pathView = ''

  switch (type) {
    case 'users':
      const user = await User.findById(id)
      if (!user) {
        return false
      }

      pathView = `./uploads/users/${user.img}`
      await deleteImage(pathView)

      user.img = fileName
      await user.save()
      return true

      break
    case 'teams':
      const team = await Team.findById(id)
      if (!team) {
        return false
      }

      pathView = `./uploads/teams/${team.img}`
      await deleteImage(pathView)

      team.img = fileName
      await team.save()
      return true

      break
    case 'tournaments':
      const tournament = await Tournament.findById(id)
      if (!tournament) {
        return false
      }

      pathView = `./uploads/tournaments/${tournament.img}`
      await deleteImage(pathView)

      tournament.img = fileName
      await tournament.save()
      return true

      break
  }
}

module.exports = {
  saveImage,
  deleteImage
}
