/* Route: /api/match */
const { Router } = require('express')

const { getMatch, updateMatch } = require('../controllers/matches')
const { jwtValidator } = require('../middlewares/validate-jwt')

const router = Router()

router.get('/:id', jwtValidator, getMatch)
router.put('/:id/active', jwtValidator, updateMatch)

module.exports = router
