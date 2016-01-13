import VM from '../viewModel.js';

var BS = require('../../../helpers/bootstrap');

var moment = require('moment');

export default class VMpassword extends VM {

  constructor(args) {
    super(args);

    var vm = this;

    vm.username = m.prop('');
    vm.password = m.prop('');
    vm.repeat = m.prop('');

    vm.birthdayYear  = m.prop('');
    vm.birthdayMonth = m.prop('');
    vm.birthdayDay   = m.prop('');

    vm.error = m.prop('');

    //define keys and properties for date fields
    vm.datefields = {
      Year: {placeholder: 'YYYY', digits:4, min:1900, max:(new Date().getFullYear())},
      Month: {placeholder: 'MM', digits:2, min:1, max:12},
      Day: {placeholder: 'DD', digits:2, min:1, max:31}
    };

    //define an getter/setter function with validation for date fields
    vm.dateAccess = function dateAccess (key,value){
      //access value if not specifying one
      if(arguments.length<2){
        return vm['birthday'+key]();
      }
      var intval = parseInt(value);
      //validate a date value for the key
      //then set the value for the appropriate property
      var fieldprops = vm.datefields[key];
      if(value && value.length>fieldprops.digits){
        //too many digits
        vm.dateErrors[key](key+' may have a maximum of '+fieldprops.digits+'.');
      } else if(intval>fieldprops.max || intval<fieldprops.min){
        //out of bounds
        vm.dateErrors[key](key+' must be between '+fieldprops.min+' and '+fieldprops.max+'.');
      } else {
        vm.dateErrors[key]('');
        vm['birthday'+key](value||'');
      }
    };

    //curry getter/setter function for each key
    vm.dateAccessors = {};
    vm.dateErrors = {};
    Object.keys(vm.datefields).forEach(function(key){
      vm.dateAccessors[key] = function(value){
        return vm.dateAccess(key,value);
      };
      vm.dateErrors[key]=m.prop('');
    });

    return vm;
  }

  loginForm(ctrl) {
    return m('.login', BS.row([
          m("input.username.col-md-12[placeholder='Email Address'][name=username]",
            {oninput: m.withAttr("value", ctrl.vm.username)},
            ctrl.vm.username()),
          m("input.password.col-md-12[placeholder=Password][name=password][type=password]",
            {oninput: m.withAttr("value", ctrl.vm.password)},
            ctrl.vm.password()),
          m("button.col-md-12", {onclick: ()=>{ctrl.vm.loginSubmit();}}, "Login"),
          ]));
  }

  loginSubmit(){
    console.log('loginSubmit');
    var postdata = {
      username: this.username(),
      password: this.password()
    };
    var postargs = {
      method: "POST",
      url: this.apiUrl+"auth/local/login",
      data: postdata,
    };
    return m.request(postargs).then((data)=>{this.afterLogin(data);}, (data)=>{this.onError(data);});
  }

  createForm(ctrl) {
    return m('.createAccount',[
        m("input.username.col-md-12[placeholder='Email Address'][name=username]",
          {oninput: m.withAttr("value", ctrl.vm.username)},
          ctrl.vm.username()),
        m("input.password.col-md-6[placeholder=Password][name=password][type=password]",
          {oninput: m.withAttr("value", ctrl.vm.password)},
          ctrl.vm.password()),
        m("input.repeat.col-md-6[placeholder='Repeat Password'][name=repeat][type=password]",
          {oninput: m.withAttr("value", ctrl.vm.repeat)},
          ctrl.vm.repeat()),
        m('.birthdate',
          ['Year','Month','Day'].map( (field)=>{
            return m("input.col-md-4.birthday"+field+
              "[placeholder='Birthday "+field+"']"+
              "[name=birthday"+field+"]"+
              "[type=number]",
              {oninput: m.withAttr("value", ctrl.vm.dateAccessors[field])},
              ctrl.vm.dateAccessors[field]());
          } )
         ),
        m("button.col-md-12", {onclick: ()=>{ctrl.vm.createSubmit();}}, "Create Account"),
        ]);
  }

  createSubmit(){
    console.log('createSubmit');
    if(this.password() !== this.repeat()){
      //reject form submission here
      console.log('passwords dont match');
      this.error('Passwords do not match.');
      return;
    } else {
    }

    return;

    var bd = this.birthdayYear()+'-'+this.birthdayMonth()+'-'+this.birthdayDay();
    console.log(bd);
    var postdata = {
      username: this.username(),
      password: this.password(),
      birthdate: this.birthdate()
    };
    var postargs = {
      method: "POST",
      url: this.apiUrl+"auth/local/signup",
      data: postdata
    };
    return m.request(postargs).then((data)=>{this.afterLogin(data);}, (data)=>{this.onError(data);});
  }

  view(ctrl) {
    let vm = ctrl.vm;
    return m('.password-login-page', [
        BS.row([
          BS.col(['col-xs-12','col-md-6'],BS.panel(this.loginForm(ctrl),'Log In')),
          BS.col(['col-xs-12','col-md-6'],BS.panel(this.createForm(ctrl),'Create Account')),
          ]),
        BS.row(BS.col(['col-xs-12'],m('.bg-danger',
              ctrl.vm.error() || "" // show error if any
              )))
        ]);
  }
};
