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
    sess.token(data.access_token);
    let route = sess.currentRoute() || '/';
    m.route(route,true);
  }

  onError(data) {
    console.log(data);
    this.error(data.error && data.error.text);
  }


};
