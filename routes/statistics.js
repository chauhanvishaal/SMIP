var express = require('express');
var router = express.Router();
const statisticsService = require("../services/statistics/index.js");

// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

router.get('/',function (httpRequest, httpResponse, next){
    //response.send('hello world');
    statisticsService.getStatistics().then(function(response){
        //res.send("success.. response.length = " + response.size);
        //logger.log("In app.get, JsonResponse = %s", response);
        //response.JSON(response);
        httpResponse.send(response);
    });
});

module.exports = router;
//ToDo - Create more routes like api/stats/cpu, api/stats/memory etc.. to get specific counters/stats


