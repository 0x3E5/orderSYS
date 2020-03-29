# 在线点餐系统

> 这是一个采用 Vue 和 Node.js 开发的在线点餐管理系统，作为我的毕业设计。其主要功能包含对订单的实时提醒以及商品分类的管理和商品的管理。用到的主要技术有：express、bcrypt、passport、passport-jwt、jsonwebtoken、formidable、gravatar、mongoose、socket.io、element-ui、axios、better-scroll、qrcode、vue-echarts、vue-router、vuex等。

## 1.效果展示

![点餐界面](https://i.loli.net/2020/03/29/wylN8gI5ntEfzLe.jpg)

![后台首页](https://i.loli.net/2020/03/29/mhxiITEpjyrYwQ1.jpg)

![后台商品管理](https://i.loli.net/2020/03/29/soTrGU2bnL1Z6Cx.jpg)

## 2.运行环境

Vue：@vue/cli 4.2.2

Node：v12.16.1

MongoDB：4.2.3

## 3.运行说明

### 3.1开发环境

- 修改**config/config.js**设置MongoDB数据库连接和jsonwebtoken密钥
- 修改**client/src/main.js**设置**connection**连接地址(设置为你服务端的IP地址)
- 在根目录执行`npm install`，执行完成后通过`node server.js`启动服务端
- 进入**client**目录执行`npm install`,执行完成后通过`npm run serve`启动vue项目

###  3.2生产环境

- 将node项目放入pm2中运行

- 将client文件夹中的项目通过`npm run build`进行编译，编译完成后放到服务器上在nginx中配置代理和路由并重启nginx服务即可

  ```nginx
  #路由模式(非history模式不需要添加)
  	location / {
          try_files $uri $uri/ /index.html;
      }
  #api代理
  location /api/ {
      proxy_pass   http://yourdomain.com:3000/api/;
  }
  ```

  