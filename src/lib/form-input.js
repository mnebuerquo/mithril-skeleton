import m from 'mithril';
import Component from './component.js';

export class FormField extends Component {
  // FormField is a base class for a component.
  // This can be extended for specialized form fields.

  constructor(args){
    //always call super to set up controller
    super(args);

    // this class constructs a view-model
    var vm = this;

    //field has a name which is required
    vm.name = args.name || 'unnamedField';

    //field can have any css classes applied
    vm.classlist = args.classlist || [];

    //field can have an error accessor
    vm.error = args.error || m.prop('');

    //field needs to have a value accessor
    vm.value = args.value || m.prop('');

    //field has an html input type
    vm.type = args.type || 'text';

    //field can have an array of functions for validation
    //validators accept a value argument and return null or error
    //message
    vm.validators = args.validators || [];

    //the accessor is a getter/setter which performs validation and
    //sets the error property
    vm.accessor = function(value){
      if(arguments.length<1){
        return vm.value();
      } else {
        var error = '';
        vm.validators.some(function(fn){
          error = fn(value);
          return error?error:false;
        });
        if(!error){
          vm.value(value);
          vm.error('');
        } else {
          vm.error(error);
        }
      }
    }
  }

  view(){
    var vm = this;
    var selector = ['input'].concat(vm.classlist).join('.');
    var attributes = {};
    attributes.name = vm.name;
    attributes.type = vm.type || 'text';
    attributes.oninput = m.withAttr("value", vm.accessor);
    var initialValue = vm.value();
    return m(selector,attributes,initialValue);
  }

  setControllerArgs(args){
    super.setControllerArgs(args);
  }

}//FormField


export class NumberField extends FormField {
  constructor(args){
    super(args);
    var vm = this;
    vm.type = 'number';

    if(undefined!=args.min){
      vm.validators.push( (v)=>{return (v>=args.min)?false:vm.name+' must be at least '+args.min+'.';});
    }
    if(undefined!=args.max){
      vm.validators.push( (v)=>{return (v<=args.max)?false:vm.name+' must be at most '+args.max+'.';});
    }

  }

}

