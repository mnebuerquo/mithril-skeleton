
import {FormField} from '../../lib/form-input.js';

export default class VM {
	constructor(args) {
		var vm = this;

    vm.value = m.prop('');
    vm.error = m.prop('');

    var classes = ['col-md-4'];
    var val = [
      (v)=>{
        return (v<1||v>31)?'Enter a valid date.':false;
      },
      ];
    var settings = {
      name: 'testinput',
      type: 'number',
      classlist: classes,
      error: vm.error,
      value: vm.value,
      validators: val
    };

    let c = new FormField(settings);
    vm.test = m.component(c);

		return vm;
	}
};
