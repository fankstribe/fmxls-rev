const mongoose = require("mongoose")

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('db connesso')
  } catch (error) {
    console.log(error)
    throw new Error('database non connesso')
  }
}

module.exports = {
  dbConnection
}
