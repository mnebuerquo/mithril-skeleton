import VM from './viewModel';

export default class Controller {
	constructor(args) {
    console.log('main constructor');
		var ctrl = this;
		ctrl.vm = new VM(args);
		return this;
	}
}
