/* Route: /api/playersdbs */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const { createPlayersDB, getPlayersDB, updatePlayersDB, deletePlayersDB } = require('../controllers/playersdbs')

const router = Router()

router.post('/', jwtValidator, createPlayersDB)

router.get('/', jwtValidator, getPlayersDB)

router.put('/:source', jwtValidator, updatePlayersDB)

router.delete('/:source', jwtValidator, deletePlayersDB)

module.exports = router
