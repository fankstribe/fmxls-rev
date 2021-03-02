/* Route: /api/managers */
const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/validate')
const { jwtValidator } = require('../middlewares/validate-jwt')

const { getManagers, getManager, createManager, updateManager, deleteManager } = require('../controllers/managers')

const router = Router()

router.get('/', jwtValidator, getManagers)

router.get('/:user', jwtValidator, getManager)

router.post('/',
  [
    jwtValidator,
    check('user', 'Il nome del manager è obbligatorio').not().isEmpty(),
    check('team', 'Il nome del squadra è obbligatorio').isMongoId(),
    fieldValidator
  ],
  createManager
)

router.put('/:id', jwtValidator, updateManager)

router.delete('/:id', jwtValidator, deleteManager)

module.exports = router

