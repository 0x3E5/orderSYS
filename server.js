const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')

// 设置WebSocket
const http = require('http').Server(app)
const io = require('./plugins/SocketIO').getSocketIO(http)

// 解决参数传递问题
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 连接MongoDB
const db = require('./config/config').mongoURI
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('[Log] The database is connected.'))

// 设置静态资源服务器
app.use(express.static('./public'))

// 应用路由
app.use('/api/users', require('./routes/api/users'))
app.use('/api/shop', require('./routes/api/shop'))
app.use('/api/init', require('./routes/api/init'))
app.use('/api/category', require('./routes/api/category'))
app.use('/api/commodity', require('./routes/api/commodity'))
app.use('/api/qrcode', require('./routes/api/qrCode'))
app.use('/api/order', require('./routes/api/order'))
app.use('/api/statistic', require('./routes/api/statisticData'))

// 初始化Passport
app.use(passport.initialize())
require('./config/passport')(passport)

const server = http.listen(3000, () => {
  console.log('[Log] Server is running ...')
  console.log('[Log] Url:http://127.0.0.1:3000')
})
