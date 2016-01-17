var auth = require('../../components/authenticate');
var conf = CONFIG.config;
//TODO: only pass necessary config to components
export default class VM {
	constructor(args) {
		var vm = this;
    vm.auth = [];
    vm.auth.push(m.component(auth,{'strategy':'password','conf':conf}));
    vm.auth.push(m.component(auth,{'strategy':'facebook','conf':conf}));
		return vm;
	}
};
