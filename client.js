var s = require('net').Socket();
s.connect(5024, '104.236.169.12');
s.write('GET http://104.236.169.12:5024 HTTP/1.1\n\n');

s.on('data', function(d){
    console.log(d.toString());
});

s.end();