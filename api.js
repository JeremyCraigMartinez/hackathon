var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(5024, function(){
  console.log('listening on *:5024');
});

app.use(bodyParser());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

buf = []

app.post('/', function(req, res){
	buf.push(req.body)
	res.end()
});

app.get('/', function(req, res){
  res.send(buf);
  buf = [];
});