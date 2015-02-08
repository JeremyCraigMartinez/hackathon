var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(5024, function(){
  console.log('listening on *:5024');
});

var server = BinaryServer({port: 9000});
server.on('connection', function(client){ 
	console.log("here")  ;
  var file = fs.createReadStream(__dirname + '/package.json');
	var stream = client.createStream();
	file.pipe(stream);
});

app.use(bodyParser());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

buf = []

app.post('/', function(req, res){
	if (buf.length > 100){
		buf.pop();
	}
	buf.push(req.body);
	console.log(req.body);
	res.end();
});

app.get('/', function(req, res){
  res.send(buf);
  buf = [];
});

app.get('/webpage', function(req, res){
  res.send(buf);
});

app.get('/livestream', function(req, res){
  res.send(buf);
});

