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

app.post('/', function(req, res){
	var request  = require('request');
	var pipe 		 = req.pipe(request.get('0.0.0.0/'));
	var response = []

	pipe.on('data', function(chunk){
		response.push(chunk);
	});

	pipe.on('end', function(){
		var res2 = Buffer.concat(response);
		console.log(res2);
	});
	res.end()
});

app.get('/', function(req, res){
	messages=[
		"GO away",
		"Go Cougs",
		"Hey mother fucker",
		"Kyle says hello goodbye",
		"Devin says goodbye",
		"Jeremy says hi"
	]
	num = Math.floor(Math.random()*5);
	console.log(req.body)
  res.send(messages[num]);
});