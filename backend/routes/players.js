/* Route: /api/players */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const { getPlayers } = require('../controllers/players')

const router = Router()

router.get('/', jwtValidator, getPlayers)

module.exports = router
