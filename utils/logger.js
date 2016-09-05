"use strict";

let debug = require("debug");
let log = debug('');
let logError = debug('error');

let moduleName ;

//exports.init = function (name) {
function init(name) {
    moduleName = name ;
    log = debug(moduleName + ':log');
    logError = debug(moduleName + ':error');
}
module.exports = {

    log : log,
    logError : logError,
    version : '1.0.0',
    init: function (name) {
        init(name);
    }
};
//export {logger };
// class logger {
//
//     constructor(name){
//        moduleName = name ;
//     }
//     log(){
//         return debug(moduleName + ':log');
//     };
//
//     logError () {
//         return debug( moduleName + ':error');
//     };
// };

