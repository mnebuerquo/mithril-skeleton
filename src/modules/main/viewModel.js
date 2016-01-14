
import moment from 'moment';
import {DateTriple} from '../../lib/form-input.js';

export default class VM {
	constructor(args) {
		var vm = this;

    vm.value = m.prop('');
    vm.error = m.prop('');

    var classes = ['bob'];
    var val = [
      (v)=>{ return moment(v).isAfter(moment())?'Date must be in the past!':false; },
      ];
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
