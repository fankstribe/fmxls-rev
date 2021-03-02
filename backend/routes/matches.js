/* Route: /api/match */
const { Router } = require('express')

const { createMatch } = require('../controllers/matches')

const router = Router()

// router.get('/', jwtValidator, getTeams)

router.post('/',

  createMatch
)

// router.put('/:id', jwtValidator, updateTeam)

// router.delete('/:id', jwtValidator, deleteTeam)

module.exports = router
