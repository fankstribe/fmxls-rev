const { response } = require('express');

const { searchFifa, searchPesdb } = require('../helpers/scrape')

const Player = require('../models/player');
const Playerdbs = require('../models/playerdbs');
const Notification = require('../models/notification')
const User = require('../models/user')

const createPlayersDB = async(req, res = response) => {
  let playersDB
  try {
    const sourceExists = await Playerdbs.countDocuments()
    if (sourceExists) {
      return res.status(401).send({
        msg: "Database già presente. Aggiorna i dati o rimuovi il database per caricare un'altra fonte."
      })
    }

    switch(req.body.source) {
      case 'sofifa':
        playersDB = await searchFifa().then(list => {
          if (list) {
            return list
          } else {
            global.io.emit('database-created', { data: 'error' })
            return false
          }
        })
        break
      case 'pesdb':
        playersDB = await searchPesdb().then(list => {
          if (list) {
            return list
          } else {
            global.io.emit('database-created', { data: 'error' })
            return false
          }
        })
        break
    }

    const players = await Player.insertMany(playersDB)

    const source = new Playerdbs({source: req.body.source, countPlayers: players.length})

    await source.save()

    const infoDB = await Playerdbs.find()

    const user = await User.find({role: 'ADMIN_ROLE'}, '_id')

    const notificationUser = new Notification({user: user._id, desc: `Il database ${infoDB.source} è stato creato.`, type: 1,})

    await notificationUser.save()
    await global.io.emit('database-created', { data: infoDB })
    // await global.io.emit('notification', { data: infoDB })

    console.log(infoDB.createdAt)

    res.json({
      msg: "Database giocatori creato",
      status: 200
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}

const getPlayersDB = async(req, res = response) => {
  const playersDB = await Playerdbs.find()

  res.json({
    msg: "Giocatori trovati",
    playersDB,
    status: 200
  })
}

const updatePlayersDB = async(req, res = response) => {
  const playersDBId = req.params.source
  try {
    const players = await Player.find({source: playersDBId})

    if (!players.length) {
      return res.status(402).send({ msg: "Database non trovato" });
    }

    switch(playersDBId) {
      case 'sofifa':
        playersDB = await searchFifa().then(list => {
          if (list) {
            return list
          } else {
            global.io.emit('database-updated', { data: 'error' })
            return false
          }
        })

        break
      case 'pesdb':
        playersDB = await searchPesdb().then(list => {
          if (list) {
            return list
          } else {
            global.io.emit('database-updated', { data: 'error' })
            return false
          }
        })
        break
    }

    const results = await Player.bulkWrite(
      playersDB.map((data) => ({
        updateOne: {
          filter: { playerId: data.playerId },
          update: {
            $set: {
              age: data.age,
              position: data.position,
              overall: data.overall
            },
            $setOnInsert: {
              playerId: data.playerId,
              img: data.img,
              playerName: data.playerName,
              value: data.value,
              wage: data.wage,
              source: data.source
            }
          },
          upsert: true,
          rawResult: true,
          setDefaultsOnInsert: true
        }
      })
      )
    )

    const countPlayers = await Player.countDocuments()

    await Playerdbs.updateOne({source: playersDBId}, {countPlayers: countPlayers, updatedAt: Date.now(), addedPlayers: results.nUpserted, modifiedPlayers: results.nModified}, { upsert: true })

    const infoDB = await Playerdbs.find()

    await global.io.emit('database-updated', { data: infoDB, stats: results })

    res.json({
      msg: "Database giocatori aggiornato",
      status: 200
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }

}

const deletePlayersDB = async(req, res = response) => {
  const playersDBId = req.params.source
  try {
    const source = await Playerdbs.findOne({source: playersDBId})
    if (!source) {
      return res.status(402).send({ msg: 'Database non trovato' })
    }

    await Playerdbs.deleteOne({source: playersDBId})
    await Player.deleteMany({source: playersDBId})

    res.json({
      msg: 'Squadra eliminata',
      status: 200
    })

  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." })
  }
}

module.exports = {
  createPlayersDB,
  getPlayersDB,
  updatePlayersDB,
  deletePlayersDB
}
