import m from 'mithril';
import Component from './component.js';
var moment = require('moment');

function storeValueOrError(value){
  var error = '';
  this.validators.some(function(fn){
    error = fn(value);
    return error?error:false;
  });
  if(!error){
    this.error('');
    this.value(value);
  } else {
    this.error(error);
  }
}

export class FormField extends Component {
  // FormField is a base class for a component.
  // This can be extended for specialized form fields.

  constructor(args){
    //always call super to set up controller
    super(args);
  }

  init(args){
    super.init(args);
    args = args || {};

    // this class constructs a view-model
    var vm = this;

    //field has a name which is required
    vm.name = args.name || vm.name || 'unnamedField';

    //field can have any css classes applied
    vm.classlist = (vm.classlist || []).concat(args.classlist);

    //field can have an error accessor
    vm.error = args.error || vm.error || m.prop('');

    //field needs to have a value accessor
    vm.value = args.value || vm.value || m.prop('');

    //field has an html input type
    vm.type = args.type || vm.type || 'text';

    //placeholder will have no default text
    vm.placeholder = args.placeholder || vm.placeholder || '';

    //field can have an array of functions for validation
    //validators accept a value argument and return null or error
    //message
    vm.validators = (vm.validators || []).concat(args.validators || []);

    vm.storeValueOrError = storeValueOrError;
    //the accessor is a getter/setter which performs validation and
    //sets the error property
    vm.accessor = function(value){
      if(arguments.length<1){
        return vm.value();
      } else {
        vm.storeValueOrError(value);
        return vm.value();
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
    attributes.placeholder = vm.placeholder || '';
    var initialValue = vm.value();
    return m(selector,attributes,initialValue);
  }

}//FormField


export class NumberField extends FormField {
  constructor(args){
    super(args);
  }

  init(args){
    super.init(args);
    args = args || {};

    var vm = this;
    vm.type = 'number';

    if(undefined!=args.min){
      vm.validators.push(
          (v)=>{return (v>=args.min)?false:vm.name+' must be at least '+args.min+'.';}
          );
    }
    if(undefined!=args.max){
      vm.validators.push(
          (v)=>{return (v<=args.max)?false:vm.name+' must be at most '+args.max+'.';}
          );
    }
    if(undefined!=args.integer){
      vm.validators.push(
          (v)=>{return (parseInt(v)==parseFloat(v))?false:vm.name+' must be an integer.';}
          );
    }

  }

}//NumberField



export class DateField extends FormField {
  constructor(args){
    super(args);
  }

  init(args){
    super.init(args);
    var vm = this;
    vm.type = 'date';
  }
}//DateField



export class DateTriple extends Component {
  constructor(args){
    super(args);
  }

  init(args){
    super.init(args);
    args = args || {};

    var vm = this;

    vm.error = args.error || vm.error || m.prop('');
    vm.value = args.value || vm.value || m.prop('');

    vm.name = args.name || vm.name;

    vm.classlist = (vm.classlist || []).concat(args.classlist);
    vm.childClasses = args.childClasses || vm.childClasses || [];
    vm.placeholder = args.placeholder || vm.placeholder || '';

    var vinitial = [
      (v)=>{return moment(v,'YYYY-MM-DD').isValid()?false:'This date is not a valid date.';},
      ];

    vm.validators = (vm.validators || vinitial).concat(args.validators || vinitial);

    vm.storeValueOrError = storeValueOrError;
    function getset(type){
      var store = '';
      return function(v){
        if (arguments.length) {
          store = arguments[0];
          vm.recalc(type);
        }
        return store;
      };
    }

    var fields = {
      'Year': {placeholder:'Year', min:1900, max: (new Date().getFullYear()) },
      'Month': {placeholder:'Month', min: 1, max: 12},
      'Date': {placeholder:'Date', min:1, max:31},
    }

    Object.keys(fields).forEach(function(key){
      vm[key+'Value']=getset('Value');
      vm[key+'Error']=getset('Error');
      var settings = fields[key];
      settings.name = key;
      settings.integer = true;
      settings.value = vm[key+'Value'];
      settings.error = vm[key+'Error'];
      settings.classlist = vm.childClasses;
      settings.placeholder = vm.placeholder+' '+key;
      vm[key+'Object']=new NumberField(settings);
      vm[key+'Component']=m.component(vm[key+'Object']);
    });

  }

  recalc(type){
    if('Error'===type){
      this.error(this.YearError() || this.MonthError() || this.DateError());
    } else {
      var datestring = this.YearValue()+'-'+this.MonthValue()+'-'+this.DateValue();
      var newvalue = moment(datestring,'YYYY-MM-DD').format('YYYY-MM-DD');
      this.storeValueOrError(newvalue);
    }
  }

  view(ctrl){
    var vm = ctrl.vm;
    var selector = ['div.dateTriple'].concat(vm.classlist).join('.');
    return m(selector,[
        m(vm.YearComponent),
        m(vm.MonthComponent),
        m(vm.DateComponent),
        ]);
  }

}//DateTriple


