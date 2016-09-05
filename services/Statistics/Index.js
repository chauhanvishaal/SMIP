"use strict";
let logger = require("../../utils/logger.js");
let snmp = require('../../lib/Snmp/index.js');
//Todo - make use of configuration module rather than reading Json directly
const snmpConnectionConfig = require('../../config/config.json');

//const stats = require('../../lib/stats/index.js');

exports.getStatistics = function (snmpConnectionSettings, oids, debug) {

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
    };

    if(debug == false || debug === undefined ){
        snmpConnectionSettings = config.snmpConnectionSettings();
        oids = config.oids();
    }

    if(snmpConnectionSettings == undefined)
        throw new Error("Error: Undefined snmp ConnectionSettings");

    try{
        logger.log("in Services");
        //return stats.getStatistics(snmpConnectionSettings, oids);
        return getStatistics(snmpConnectionSettings, oids);
    }
    catch(error){
        logger.log(error);
        throw new Error("Error: Unexpected error in Service-Statistics");
    }
};

// export {getStatistics} //doesnt work, maybe local node version doesnt support it
function getStatistics(connectionSettings,oidsConfig){
    if(!connectionSettings)
        throw "Error: Undefined snmp connection settings";

    if(!oidsConfig){
        throw "Error: Undefined oids.";
    }

    snmp.session = snmp.createSession(connectionSettings.host,connectionSettings.publicString,connectionSettings.options );

    let oids = createRequest(oidsConfig);

    return new Promise(function(success, failure){
        logger.log ("getStatistics - requestOids =" + oids);

        snmp.getHostStatistics(oids).then( function(snmpHostStatistics){
            let serverStatistics = createResponse(snmpHostStatistics, oidsConfig);
            logger.log("in promise, serverStatistics = %s", serverStatistics);
            success(serverStatistics);
        });
    });
};

/*
 Separates oids from key value pair of property names & oids.
 Returns array or oid's
 */
function createRequest(oids){
    let oidArray = [];
    let oidElement;

    for(oidElement in oids){
        let oidKey = oids[oidElement] ;
        oidArray.push(oidKey);
    }
    logger.log('createRequest created oids, oid.length' + oidArray.length);
    return oidArray;
}
/*
 Builds the Json response from internal objects
 */
function createResponse(snmpResponseOidValues, oidsConfig){
    logger.log("createResponse snmpResponseOidValues.length =" + snmpResponseOidValues.size );

    let oidProperty ;
    let oid, oidValue ;
    let serverStats =[] ;
    let element = {};
    //read property/ oid key value pair from config
    for(oidProperty in oidsConfig){
        oid = oidsConfig[oidProperty] ;
        oidValue = snmpResponseOidValues.get(oid) ;
        logger.log("Reading response, oidElement: %s, oidKey: %s, oidValue: %s",oidProperty, oid, oidValue);
        //create intermediate response object with dynamic properties assign values from the response
        element = { 'name': oidProperty, 'value': oidValue.toString() };
        serverStats.push(element);
        //serverStatistics[oidProperty] = oidValue.toString() ;
    }
    let serverStatisticsJson = JSON.stringify(serverStats);
    logger.log("serverStatisticsJson =%s", serverStatisticsJson);
    return serverStatisticsJson ;
}
