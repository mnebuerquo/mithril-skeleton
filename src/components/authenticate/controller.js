export default class Controller {
	constructor(args) {
		var ctrl = this;
    var authtype = (args && args.strategy) || null;

    var vmclass = require('./viewModel.js');
    if(authtype){
      vmclass = require('./strategies/'+authtype+'.js');
    }
		ctrl.vm = new vmclass(args);
		return this;
	}
}
