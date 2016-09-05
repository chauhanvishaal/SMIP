"use strict";

let snmp = require("net-snmp");
let logger = require('../../utils/logger.js');

let session;
let sessionError;
let hostStatistics = new Map();

module.exports = {
	session: session,
	createSession: function (host, publicString, options) {
		return createSession(host, publicString,options);
	},
	getHostStatistics : function(oidList){
		return getHostStats(oidList);
	},
	closeSession: function(){
		closeSession();
	}
};

function createSession(host, publicString, options){
	//return create(config.snmpEndpoint.host, config.snmpEndpoint.publicString, options);
	session = snmp.createSession (
		host,
		publicString,
		options);
	logger.log("Snmp created Session");
	return session ;
}

/*
 Aggregates stats for given oids from the remote snmp host in oidValues collection
 */
function getHostStats(oidList){
	logger.log("In Snmp getHostStats, oids.length = " + oidList.length);
	return new Promise(function(success, failure){
		session.get(oidList,function (error, varbinds){
			logger.log("In session.get(), oids.length = " + oidList.length);
			let retValue ;
			if(error){
				logger.logError(error);
				failure(error);
			} else {
				for(let i = 0; i < varbinds.length;i++)
				{
					if(snmp.isVarbindError(varbinds[i])){
						logger.logError("VarbindError:" + snmp.varbindError(varbinds[i]));
						retValue = "";
						failure(error);
					}
					else
					{
						logger.log(varbinds[i].oid + " = " + varbinds[i].value);
						//aggregate each oid/ value pair to the collection
						hostStatistics.set(varbinds[i].oid, varbinds[i].value);
					}
				}
			}
			logger.log("in session.get() callback, oidValues has =%s elements", hostStatistics.size);
			success(hostStatistics) ;
		});
	});
}

function sessionErrorHandler(){
	if(!session) {
		session.trap(snmp.TrapType.LinkDown, function (error) {
			if (error)
				logger.logError("LinkDown: " + error);
				this.sessionError = error ;
			return error;
		});
	}
}
function closeSession(){
	session.closeSession();
}
