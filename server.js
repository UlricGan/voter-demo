
/**
 * Module dependencies.
 */

var express= require('express');
var http = require('http');
var path = require('path');
var mongoose=require('mongoose');
var MongoStore=require('connect-mongo')(express);
var socket=require('socket.io');
var Emitter=require('events').EventEmitter;
var routes=require('./routes/routes');
var config=require('./config');

var emitter=new Emitter();



var app=express();
var server=http.createServer(app);
var io=socket.listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({
	secret: 'myvote',
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
	store: new MongoStore({
		db: config.db,
		host: config.host
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app, emitter);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function(socket){
	emitter.on('change', function(aspect, competitor){
		socket.broadcast.emit('roll', aspect, competitor);
	});
});