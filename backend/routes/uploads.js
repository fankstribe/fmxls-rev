/* Route: /api/uploads */
const { Router } = require('express')
const expressFileUpload = require('express-fileupload')

const { jwtValidator } = require('../middlewares/validate-jwt')
const { fileUpload, getImage } = require('../controllers/uploads')

const router = Router()

router.use(expressFileUpload())

router.put('/:type/:id', jwtValidator, fileUpload)
router.get('/:type/:photo', getImage)

module.exports = router
