var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.post('/hello', function(req, res){
	console.log(req.body)
	res.send()
});

app.get('/hello', function(req, res){
	res.send({"hello":"world"})
});

var http = require('http');

var secureServer = http.createServer(app).listen('5024', function(){
    //console.log("Secure Express server listening on port 5024");
});