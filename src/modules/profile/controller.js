import VM from './viewModel';

export default class Controller {
	constructor(args) {
    console.log('profile constructor');
		var ctrl = this;
		ctrl.vm = new VM(args);
		return this;
	}
}
