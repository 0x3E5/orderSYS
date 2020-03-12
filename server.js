const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('./routes/router');
const users = require('./routes/api/users');
const shop = require('./routes/api/shop');
const init = require('./routes/api/init');
const category = require('./routes/api/category');
const commodity = require('./routes/api/commodity');
const qrCode = require('./routes/api/qrCode');
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 解决参数传递问题
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 连接MongoDB
const db = require('./config/config').mongoURI;
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log('[Log] The database is connected.'))

// 设置静态资源服务器
app.use(express.static('./public'));

// 应用路由
app.use(router);
app.use('/api/users',users);
app.use('/api/shop',shop);
app.use('/api/init',init);
app.use('/api/category',category);
app.use('/api/commodity',commodity);
app.use('/api/qrcode',qrCode);

// 初始化Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// 监听Socket事件
if(io){
    console.log('[Log] WebSocket Service is active. ');

    io.on('connection', function(socket){
        console.log('a user connected');
    
        socket.on("disconnect", function() {
            console.log("a user go out");
        });
    
        socket.on("message", function(obj) {
            //延迟3s返回信息给客户端
            setTimeout(function(){
                console.log('the websokcet message is'+obj);
                io.emit("message", obj);
            },3000);
        });
    })
}else{
    console.log('[Err] WeSocket Service is not active.');
}

const server = http.listen(3000,()=>{
    console.log('[Log] Server is running ...');
    console.log('[Log] Url:http://127.0.0.1:3000');
})