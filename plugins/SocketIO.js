/**
 * 封装socket.io,为了获取server以便监听.
 */
const socketio = {};
const socket_io = require('socket.io');

// 获取io
socketio.getSocketIO = (serve)=>{
    const io = socket_io.listen(serve);
    if(io){
        console.log('[Log] WebSocket service is active.');
    }
    io.sockets.on('connection', function (socket) {  
        console.log('连接成功');  
        socket.on('click1',function(){  
            console.log('监听点击事件');  
            var datas = [1,2,3,4,5];  
            socket.emit('click2', {datas: datas});  
            socket.broadcast.emit('click2',  {datas: datas});  
        })  
    })
}

module.exports = socketio;