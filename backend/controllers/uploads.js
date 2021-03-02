const path = require('path')
const fs = require('fs')
const { response } = require('express')
const { v4: uuidv4 } = require('uuid')
const { saveImage } = require('../helpers/save-image')

const fileUpload = (req, res = response) => {

  const type = req.params.type
  const id = req.params.id

  const validateType = ['users', 'teams', 'tournaments']
  if (!validateType.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: 'Non è un utente, un torneo o una squadra.'
    })

  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'Nessun file presente.'
    })
  }

  const file = req.files.image

  const filterName = file.name.split('.')
  const extFile = filterName[filterName.length -1]

  const validExt = ['png', 'jpg', 'jpeg']
  if (!validExt.includes(extFile)) {
    return res.status(400).json({
      ok: false,
      msg: 'Estensione file non consentita.'
    })
  }

  const fileName = `${uuidv4()}.${extFile}`
  const path = `./uploads/${type}/${fileName}`

  file.mv(path, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        ok: false,
        msg: 'Impossibile completare il caricamento.'
      })
    }
  })

  saveImage(type, id, fileName)

  res.json({
    ok: true,
    msg: 'File caricato.',
    fileName
  })
}

const getImage = (req, res = response) => {
  const type = req.params.type
  const photo = req.params.photo

  const imgPath = path.join(__dirname, `../uploads/${type}/${photo}`)

  // Immagine di default
  if (fs.existsSync(imgPath)) {
    res.sendFile(imgPath)
  } else if(type === 'teams') {
    const imgPath = path.join(__dirname, `../uploads/no-photo-team.png`)
    res.sendFile(imgPath)
  } else if(type === 'tournaments') {
    const imgPath = path.join(__dirname, `../uploads/no-photo-tournament.png`)
    res.sendFile(imgPath)
  } else {
    const imgPath = path.join(__dirname, `../uploads/no-photo.png`)
    res.sendFile(imgPath)
  }
}

module.exports = {
  fileUpload,
  getImage
}
