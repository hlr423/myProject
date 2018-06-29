const Koa = require('koa');
const Router = require('koa-router'); // 路由 
const static = require('koa-static'); // 静态资源
const logger = require('koa-logger'); // 日志
const request = require('request');
const path = require('path');
const app = new Koa();
const router = new Router();

const Mock = require('mockjs'); // mock数据
// const data1 = Mock.mock({
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]  
// });

// 静态资源目录
const staticPath = './public';
app.use(static(
    path.join(__dirname, staticPath)
));

// 日志
app.use(logger());

// 加载路由中间件
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('http://localhost:3000');
});