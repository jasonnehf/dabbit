'use strict';

var express=require('express');
var morgan=require('morgan');

var bodyParser=require('body-parser');

var http=require('http');
var path=require('path');
var process=require('process');

const PORT=process.env.PORT || 8008;

var app=express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res) {
	var indexpath=path.join(__dirname,'public/index.html');
	res.sendFile(indexpath);
});

app.use('/xactions',require('./routes/xactions'));

var server=http.createServer(app);

server.listen(PORT,function() {
	console.log("listening on port "+PORT);
});