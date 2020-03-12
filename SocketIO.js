/**
 * 封装socket.io,为了获取server以便监听.
 */
const socketio = {};
const socket_io = require('socket.io');

// 获取io
socketio.getSocketIO = (serve)=>{
    const io = socket_io.listen(serve);
}

module.exports = socketio;