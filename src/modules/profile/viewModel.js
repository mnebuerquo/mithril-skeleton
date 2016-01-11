var session = require('../../models/session.js');
export default class VM {
	constructor(args) {
		var vm = this;
    vm.session = session();
		return vm;
	}
};
