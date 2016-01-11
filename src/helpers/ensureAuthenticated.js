import m from 'mithril';

var session = require('../models/session.js');
var sess = session();

// Use this function to decorate a controller constructor
// controller: ensureAuthenticated(controller)
export default function ensureAuthenticated(fn,forgetRoute){
  return function() {
    if(sess.isAuthenticated()){
      // we are logged in
      // clear the remembered redirect route.
      sess.currentRoute('');
      //was going to use fn.apply(this,arguments), but it was a class,
      //and threw an exception
      return new fn();
    } else {
      // not logged in
      if(!forgetRoute){
        // set current route so we can return after login
        sess.currentRoute(m.route());
      }
      // redirect to login
      m.route('/login');
    };
  }
}
