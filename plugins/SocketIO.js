/**
 * 封装socket.io,为了获取server以便监听.
 */
const socketio = {}
const socket_io = require('socket.io')

socketio.getSocketIO = serve => {
  const io = socket_io.listen(serve)
  if (io) {
    console.log('[Log] WebSocket service is active.')
  }
  io.sockets.on('connection', function(socket) {
    socket.on('submitOrder', function() {
      socket.broadcast.emit('checkOrder')
      socket.broadcast.emit('playAudio')
    })
  })
}

module.exports = socketio
