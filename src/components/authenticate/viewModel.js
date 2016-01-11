var session = require('../../models/session.js');

export default class VM {
	constructor(args) {
    this.session = session();
    this.conf = (args && args.conf) || {};
    this.apiUrl = (this.conf && this.conf.api && this.conf.api.url) || '';
		var vm = this;
		return vm;
	}

  afterLogin(data) {
    console.log(data);
    this.error(data);
    let sess = session();
    console.log('setting session token');
    sess.token(data.access_token);
    console.log('is logged in? '+sess.isAuthenticated());
    let route = sess.currentRoute() || '/';
    if( route == m.route() ){
      console.log('already on route! '+route);
      route = '';
    } else {
      console.log('need route change from '+m.route());
    }
    console.log('routing to '+route);
    m.route(route);
  }

  onError(data) {
    console.log(data);
    this.error(data.error && data.error.text);
  }


};
