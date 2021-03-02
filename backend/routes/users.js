/* Route: /api/users */
const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/validate')
const { jwtValidator } = require('../middlewares/validate-jwt')

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')

const router = Router()

router.get('/', jwtValidator, getUsers)

router.post('/',
  [
    check('name', 'Il nome è obbligatorio').not().isEmpty(),
    check('password', 'La password è obbligatoria').not().isEmpty(),
    check('email', "L'email è obbligatoria").isEmail(),
    fieldValidator
  ],
  createUser
)

router.put('/:id',
  [
    jwtValidator,
    check('name', 'Il nome è obbligatorio').not().isEmpty(),
    check('email', "L'email è obbligatoria").isEmail(),
    check('role', "Il ruolo è obbligatorio").not().isEmpty(),
    fieldValidator
  ],
  updateUser
)

router.delete('/:id', jwtValidator, deleteUser)

module.exports = router
