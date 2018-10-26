var express = require('express');
var session = require('express-session');
var mongoose = require('./config/mongoose.js');
var bodyParser = require('body-parser');

//路由配置
var routes = require('./routes');

var app = express();

//设置端口
app.set('port',process.env.PORT || 3333);

//连接数据库
var db = mongoose();

//引入Cooike与内存存储
app.use(session({
    secret: 'cookieSecret', //作为服务器端生成session的签名
    resave: true,           //是否允许当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存
    saveUninitialized: false, //初始化session时是否保存到存储
    cookie: {
        maxAge: 1000 * 60 * 5  //设置session的有效时间，单位毫秒
    }
}))

//路由目录
routes(app);

//post请求URL解析
app.use(bodyParser.urlencoded({
    extended: false
}))

//开启监听端口
app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-c to terminate.');
});