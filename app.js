var express = require('express');  //使用express来搭建一个服务器
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var hbs = require('hbs'); //hbs搜索引擎，创建动态页面
var debug = require('debug')('node-express:server');
var http = require('http');

var app = express();


// 加载数据模块
var blogEngine = require('./blog');

//console.log(blogEngine.getBlogEntry(2));

var port = normalizePort(process.env.PORT || '3001'); //存储端口号的变量,process.env.PORT || '3001'设置端口号
app.set('port', port); //端口号
var server = http.createServer(app); // 创建一个以此端口号的服务器


app.set('views', path.join(__dirname, 'views'));  //视图存放的目录
app.set('view engine', 'html'); //网页模板引擎
app.engine('html',hbs.__express);  //hbs搜索引擎


//说是express的内置模块，但是并不懂，不过项目能跑起来了
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //静态文件的目录


 //app.use(app.router);




/***路由访问页面********************************************/
/*app.get('/', function (req, res) {
  //res.send('Hello world!1111111');
  //res.sendfile('./views/index.html'); //访问静态页面的
  res.render('index');
});*/

app.get('/', function(req, res) {
  res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

app.get('/about', function(req, res) {
  res.render('about', {title:"自我介绍"});
});

app.get('/article/:id', function(req, res) {
  var entry = blogEngine.getBlogEntry(req.params.id);
  res.render('article',{title:entry.title, blog:entry});
});


/*****服务器出错反馈*******************************************/
//找不到页面
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//服务器错误反馈
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/*服务器端口处理*************************/

server.listen(port, function () {
   console.log(port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * 规范化端口，是一个端口是数字、字符串或不正确
 */

function normalizePort(val) {
  var port = parseInt(val, 10); //以十进制的形式取整
  if (isNaN(port)) { //isNaN 是否是数字，严格性检查数字
    // named pipe
    return val; //如果是就返回
  }
  if (port >= 0) {
    // port number
    return port;  //返回端口号
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 * 监听http请求服务器错误处理
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * http服务器处监听处理
 */

function onListening() {
  var addr = server.address();
  //console.log(addr); // { address: '::', family: 'IPv6', port: 3001 }
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;

  //console.log(bind);
  debug('Listening on ' + bind); //就是监听了一个端口号
}
/*服务器端口出错处理 end*/


console.log('server is running at http://127.0.0.1:3001')
