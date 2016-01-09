import m from 'mithril';

var session = require('../models/session.js');

export default function ensureAuthenticated(fn,currentRoute){
  var sess = session();
  if(sess.isAuthenticated()){
    sess.currentRoute('');
    return fn;
  } else {
    return function(args){
      sess.currentRoute(currentRoute);
      m.route('/login',true);
    };
  }
}
