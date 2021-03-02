const jwt = require('jsonwebtoken')
const User = require('../models/user')

const jwtValidator = (req, res, next) => {

  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Nessun token presente'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = uid

    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Il token non è valido.'
    })
  }
}

module.exports = {
  jwtValidator
}
