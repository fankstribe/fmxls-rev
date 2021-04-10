require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

// Inizializza servizio express
const app = express()

// Cors
app.use(cors())

app.use(express.json())

// Database
dbConnection()

// Rotte
app.use('/api/users', require('./routes/users'))
app.use('/api/teams', require('./routes/teams'))
app.use('/api/managers', require('./routes/managers'))
app.use('/api/tournaments', require('./routes/tournaments'))
app.use('/api/matches', require('./routes/matches'))
app.use('/api/scores', require('./routes/scores'))
app.use('/api/players', require('./routes/players'))
app.use('/api/playersdbs', require('./routes/playersdbs'))

app.use('/api/login', require('./routes/auth'))
app.use('/api/uploads', require('./routes/uploads'))

app.listen(process.env.PORT, () => {
  console.log('Servizio attivo su porta ' + process.env.PORT)
})
