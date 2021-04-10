/* Route: /api/players */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const { createPlayersDB } = require('../controllers/players')

const router = Router()

router.post('/', jwtValidator, createPlayersDB)

module.exports = router
