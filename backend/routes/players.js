/* Route: /api/players */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const { getPlayers, deletePlayer, updatePlayer, getPosition } = require('../controllers/players')

const router = Router()

router.get('/', jwtValidator, getPlayers)
router.get('/position', jwtValidator, getPosition)
router.put('/:id', jwtValidator, updatePlayer)
router.delete('/:id', jwtValidator, deletePlayer)

module.exports = router
