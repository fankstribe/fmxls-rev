/* Route: /api/login */
const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/validate')
const { jwtValidator } = require('../middlewares/validate-jwt')
const { login, tokenRefresh } = require('../controllers/auth')


const router = Router()

router.post('/',
  [
    check('email', "Inserisci un email corretta").isEmail(),
    check('password', 'La password è obbligatoria').not().isEmpty(),
    fieldValidator
  ],
  login
)

router.get('/autologin',
  jwtValidator,
  tokenRefresh
)

module.exports = router
