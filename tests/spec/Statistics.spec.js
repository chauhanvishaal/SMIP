"use strict";

var statisticsService = require('../../services/statistics/index.js');
var log = require('../../utils/logger.js').log ;
let snmpConnectionConfig = require('../../config/config.json');

describe('Statistics Service tests', function () {

    let statisticsJson;

    it('Service throws error when snmpConnectionSettings are undefined', function () {
        let thrownError ;
        //statisticsService.getStatistics(undefined,undefined).then(function (responseData) {
        try {
            expect(statisticsService.getStatistics(undefined,undefined,true))
        }
        catch (error){
            thrownError = error ;
        }
        expect(thrownError.message).toContain('Error') ;
    });

    let config = {
        snmpConnectionSettings: function() {

            let conSettings = {} ;
            conSettings['host'] = snmpConnectionConfig.snmpEndpoint.host ;
            conSettings['publicString'] = snmpConnectionConfig.snmpEndpoint.publicString ;

            conSettings['options'] = {
                port: snmpConnectionConfig.snmpEndpoint.port ,
                timeout: 5000//,
                //version: snmpConnectionConfig.snmpEndpoint.version
            };

            return conSettings ;
        },
        oids : function () {
            return snmpConnectionConfig.oids ;
        }
    }

    describe(' Async getStatistics() test ',function () {
        let originalTimeout = 0;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 4000;
        });

        it('Service returns valid Json response', function (done) {
            let connectionSettings = config.snmpConnectionSettings();
            let oids = config.oids() ;

            statisticsService.getStatistics().then(function(response){
                //res.send("success.. response.length = " + response.size);
                //log("In app.get, response = %s", response);
                expect(response).toContain('OneMinAverageLoad');
                done();
            });
        });

        afterEach(function () {
           jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout ;
        });
    });
});


