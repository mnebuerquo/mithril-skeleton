/*
   Config index

   Requires config file, or default if config doesn't exist.
   */
var fs = require('fs');
var path = require('path');

var def = undefined;
var conf = undefined;

// This was a quick and dirty way to see if these files exist
// before requiring them.
fs.readdirSync(__dirname).forEach(function(filename) {
  var ext = path.extname(filename);
  var name = path.basename(filename,ext);
  if(name==='default'){
    def = require('./default');
  } else if(name==='config'){
    conf = require('./config');
  }
});

// the exported configuration is from config.js if it exists
// else it will be default.js
var config = conf || def;
console.log(config);
module.exports = config;
