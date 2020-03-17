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
const order = require('./routes/api/order');
const statisticData = require('./routes/api/statisticData');

// 设置WebSocket
const http = require('http').Server(app);
const io = require('./plugins/SocketIO').getSocketIO(http);

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
app.use('/api/order',order);
app.use('/api/statistic',statisticData);

// 初始化Passport
app.use(passport.initialize());
require('./config/passport')(passport);

const server = http.listen(3000,()=>{
    console.log('[Log] Server is running ...');
    console.log('[Log] Url:http://127.0.0.1:3000');
})