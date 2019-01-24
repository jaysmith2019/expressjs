var express = require('express');
var app = express();
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var path = require('path');

app.use(express.static('static'))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.listen(8080, port);