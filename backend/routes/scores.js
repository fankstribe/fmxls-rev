/* Route: /api/score */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const router = Router()

// router.get('/:id', jwtValidator, getMatch)

module.exports = router
