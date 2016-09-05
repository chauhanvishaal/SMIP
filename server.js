"use strict";

let logger = require('./utils/logger.js');

var express = require('express');
var statistics = require('./routes/statistics.js');
const statisticsService = require("./services/statistics/index.js");

var app = express();

app.use(function (req, res, next) {
	//Todo - move allowed host:port values to config
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Pass to next layer of middleware
	next();
});

app.use('/api/stats',statistics);

// app.get('/', function (req, res) {
// 	statisticsService.getStatistics().then(function(response){
// 		//res.send("success.. response.length = " + response.size);
// 		logger.log("In app.get, JsonResponse = %s", response);
// 		res.send(response);
// 	});
// });

app.use(function (error, request,response,next) {
	logger.log(error.stack);
	response.status(500).render("Internal server error!");
});

var server = app.listen(9091, function () {
var host = server.address().address;
var port = server.address().port;

logger.log("Listening at http://%s:%s", host, port);

});