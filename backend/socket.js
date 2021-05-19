module.exports = io.on('connection', socket => {
  console.log(`Socket connesso id: ${socket.id}`)

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnesso' + reason)
  })
})
