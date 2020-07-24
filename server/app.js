var createError = require('http-errors');//创建express、koa等的http错误插件
var express = require('express');//express框架
var path = require('path');//路径（放在哪就是当前路径）
var cookieParser = require('cookie-parser');//cookie解析插件
var logger = require('morgan');//日志插件
var ejs = require('ejs')
var favicon = require('express-favicon')

// 开发机测试配置：启动redis服务后加 --protected-mode no 选项 使其允许远程连接

var redis = require('redis')
var db = redis.createClient({ "host": "127.0.0.1", "port": "6379" });
// console.log(db)


require('./utils/util')

var indexRouter = require('./routes/index');//index路由
var usersRouter = require('./routes/users');//users路由
var goodsRouter = require('./routes/goods');//goods路由

var app = express();//创建express服务

// view engine setup
app.set('views', path.join(__dirname, 'views'));//指定views路径
app.engine('.html', ejs.renderFile)
app.set('view engine', 'html');//指定view页面的模板类型

//使用这些插件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'../public/images/favicon.ico')));

// app.use(function(req, res, next){
//   var ua = req.headers['user-agent'];
//   db.zadd('online', Date.now(), ua, next);
// });

// app.use(function(req, res, next){
//   var min = 60 * 1000;
//   var ago = Date.now() - min;
//   db.zrevrangebyscore('online', '+inf', ago, function(err, users){
//     if (err) return next(err);
//     req.online = users;
//     next();
//   });
// });
//
// app.get('/', function(req, res){
//   res.send(req.online.length + ' users online');
// });

app.use((req, res, next) => {
    if (req.cookies.userId) {
        next()
    } else {
        if (req.originalUrl == '/users/login' ||
            req.originalUrl == '/users/logout' ||
            req.originalUrl.indexOf('/goods/list') > -1) {
            next()
        } else {
            res.json({
                status: 10001,
                msg: '请先登录',
                result: ''
            })
        }
    }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);

// catch 404 and forward to error handler
//捕获404并发送给错误处理程序
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
//错误处理
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    //设置局部变量，只提供开发模式下的错误信息
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
