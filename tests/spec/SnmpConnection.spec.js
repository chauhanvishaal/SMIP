"use strict";

var snmp = require("../../lib/Snmp/Index.js");
let config = require("../../config/config.json");

describe("Snmp module tests",function(){

	let snmpSession ;
	let options = {
	    port: config.snmpEndpoint.port, //default
	    // retries: 1,
	    timeout: 5000
	    //version: config.snmpEndpoint.version
	};

	it("Snmp.createSession returns valid session",function(){
			snmpSession = snmp.createSession(config.snmpEndpoint.host, config.snmpEndpoint.publicString, options);
			expect(snmpSession).not.toBe(undefined) ;
	});

	//session shld be undefined unless createSession invoked

});