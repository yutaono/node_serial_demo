
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , mock = require('./routes/mock')
  , http = require('http')
  , path = require('path')
  , serialport = require('serialport');

// var app = module.exports = express.createServer();
var app = express();

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/mock', mock.mock);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// Global Variables
var soundStatus = {
	leftOrRight: 'L',
	centerOrBack: 'C',
	mp3FileNum: '0',
	push_id: '000'
};
var modeStatus = 0;

//
// Socket.io
//
//
var io=require('socket.io').listen(server);
// var socket = io.sockets.on;

io.sockets.on('connection', function(socket){
	console.log('connected');

	socket.emit('mode status', modeStatus);
	socket.broadcast.emit('mode status', modeStatus);

	socket.on('msg click', function(){
		sp.write("n")
		sp.emit('data', 'RC2009');
		socket.emit('get soundStatus', soundStatus);
		socket.broadcast.emit('get soundStatus', soundStatus);
	});

	socket.on('post modeStatus', function(){
		// console.log('post modeStatus');
		socket.emit('get modeStatus', modeStatus);
		socket.broadcast.emit('get modeStatus', modeStatus);
	});

	socket.on('post soundStatus', function(){
		// console.log('post mp3FileNum');
		socket.emit('get soundStatus', soundStatus);
		socket.broadcast.emit('get soundStatus', soundStatus);
	});

});


//
// Serial Port
//
// var portName = '/dev/tty.usbmodemfa141';
var portName = '/dev/tty.usbmodemfd131';
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600
    // , dataBits: 8
    // parity: 'none',
    // stopBits: 1,
    // flowControl: false,
    , parser: serialport.parsers.readline("\n")
});

sp.on("open", function () {
  console.log('open');
 
  setTimeout(function() {
    sp.write("you", function(err, results) {
//       console.log('err ' + err);
//       console.log('results ' + results );
    }); 
  }, 1000); 
});
 
sp.on('data', function(data) {
  if(data){
		// console.log('data received: ' + data);
	}
	if(data.match(/(L|R)(C|B)[0-5][0-9][0-9][0-9]/)){
		// console.log('sound command-----------------');
		// Sound Command
		soundStatus.leftOrRight = data[0];
		soundStatus.centerOrBack = data[1];
		soundStatus.mp3FileNum = data[2]-0;
		soundStatus.push_id = String(data[3]) + String(data[4]) + String(data[5]);
	} else if(data.match(/st[0-3]/)){
		// Mode Command
		// console.log('mode command------------------');
		modeStatus = data[2];
	} else {
		// console.log(data + ': this expression is not match.');
	}

});
 
sp.on('error', function(err) {
  console.log('err ' + err);
});