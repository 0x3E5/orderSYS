/**
 * 封装socket.io,为了获取server以便监听.
 */
const socketio = {};
const socket_io = require('socket.io');

socketio.getSocketIO = (serve)=>{
    const io = socket_io.listen(serve);
    if(io){
        console.log('[Log] WebSocket service is active.');
    }
    io.sockets.on('connection', function (socket) {  
        console.log('客户端连接了');
        socket.on('submitOrder',function(){  
            console.log('触发了submitOrder方法');
            socket.broadcast.emit('checkOrder');  
        })  
    })
}

module.exports = socketio;