/* Route: /api/players */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const { getPlayers, deletePlayer } = require('../controllers/players')

const router = Router()

router.get('/', jwtValidator, getPlayers)
router.delete('/:id', jwtValidator, deletePlayer)

module.exports = router
