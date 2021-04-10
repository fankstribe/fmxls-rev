/* Route: /api/playersdbs */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const { createPlayersDB } = require('../controllers/playersdbs')

const router = Router()

router.post('/', jwtValidator, createPlayersDB)

module.exports = router
