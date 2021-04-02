/* Route: /api/match */
const { Router } = require('express')

const { getMatch } = require('../controllers/matches')
const { jwtValidator } = require('../middlewares/validate-jwt')

const router = Router()

router.get('/:id', jwtValidator, getMatch)

module.exports = router
