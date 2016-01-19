/*
   Config index

   Requires config file, or default if config doesn't exist.
   */
var fs = require('fs');
var path = require('path');

var defaultConf = undefined;
var userConf = undefined;

// This was a quick and dirty way to see if these files exist
// before requiring them.
fs.readdirSync(__dirname).forEach(function(filename) {
  var ext = path.extname(filename);
  var name = path.basename(filename,ext);
  if(name==='default'){
    console.log('loading default config');
    defaultConf = require('./default');
  } else if(name==='config'){
    console.log('loading config');
    userConf = require('./config');
  }
  console.log('done');
});

// do deepmerge of config into default
var merge = require('deepmerge');
var config = merge(defaultConf,userConf);
console.log(config);

module.exports = {};
module.exports.config = config;


