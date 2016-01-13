
import {DateTriple} from '../../lib/form-input.js';

export default class VM {
	constructor(args) {
		var vm = this;

    vm.value = m.prop('');
    vm.error = m.prop('');

    var classes = ['bob'];
    var val = [ ];
    var settings = {
      name: 'testinput',
      classlist: classes,
      error: vm.error,
      value: vm.value,
      validators: val,
    };

    let c = new DateTriple(settings);
    vm.test = m.component(c);

		return vm;
	}
};
