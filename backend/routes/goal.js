/* Route: /api/goal */
const { Router } = require('express')

const { jwtValidator } = require('../middlewares/validate-jwt')

const router = Router()

// router.get('/', jwtValidator, getMatch)

module.exports = router
