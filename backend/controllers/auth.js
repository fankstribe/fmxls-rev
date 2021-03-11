const { response } = require('express')
const bcrypt = require("bcryptjs")

const User = require("../models/user")
const { tokenJWT } = require('../helpers/jwt')
const { getMenuFrontend } = require('../helpers/menu-frontend')

const login = async(req, res = response) => {

  const { email, password } = req.body

  try {
    // Verifica email
    const userDB = await User.findOne({email})

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        msg: 'La mail inserita non esiste.'
      })
    }

    // Verifica password
    const validPassword = bcrypt.compareSync(password, userDB.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'La password inserita non è corretta.'
      })
    }

    // Crea token
    const token = await tokenJWT(userDB.id)

    res.json({
      ok: true,
      token,
      menu: getMenuFrontend(userDB.role)
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    })
  }
}

const tokenRefresh = async(req, res = response) => {
  const uid = req.uid

  const token = await tokenJWT(uid)
  const user = await User.findById(uid)

  res.json({
    ok: true,
    token,
    user,
    menu: getMenuFrontend(user.role)
  })
}

module.exports = {
  login,
  tokenRefresh
}
