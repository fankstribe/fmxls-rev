/* Route: /api/tournaments */
const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/validate')
const { jwtValidator } = require('../middlewares/validate-jwt')

const { getTournaments, getTournament, createTournament, updateTournament, deleteTournament } = require('../controllers/tournaments')

const router = Router()

router.get('/', jwtValidator, getTournaments)

router.get('/:id', jwtValidator, getTournament)

router.post('/',
  [
    jwtValidator,
    check('tournamentName', 'Il nome del torneo è obbligatorio').not().isEmpty(),
    fieldValidator
  ],
  createTournament
)

router.put('/:id', jwtValidator, updateTournament)

router.delete('/:id', jwtValidator, deleteTournament)

module.exports = router
