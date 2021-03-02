const jwt = require("jsonwebtoken")

const tokenJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    }

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject('Impossibile generare il token.')
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  tokenJWT
}
