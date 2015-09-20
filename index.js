// This script is meant to be used with forever, but it seems to not handle
// properly babel-node, so we use a plain ES5 script as base.

require('babel/register');
var checkForNewHotDeals = require('./src/checkForNewHotDeals.js');
var config = require('./config.json');

checkForNewHotDeals();
setInterval(checkForNewHotDeals, config.checkIntervalMs);
