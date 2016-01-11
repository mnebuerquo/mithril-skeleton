import VM from '../viewModel.js';

//require('better-dom/dist/better-dom.js');
//require('better-i18n-plugin/dist/better-i18n-plugin.js');
//require('better-dateinput-polyfill/dist/better-dateinput-polyfill.js');

var BS = require('../../../helpers/bootstrap');

var moment = require('moment');

export default class VMpassword extends VM {

  constructor(args) {
    super(args);

    this.username = m.prop('');
    this.password = m.prop('');
    this.repeat = m.prop('');

    //this.birthdate = m.prop('');

    this.birthdayYear  = m.prop('');
    this.birthdayMonth = m.prop('');
    this.birthdayDay   = m.prop('');

    this.error = m.prop('');

    var vm = this;
    return vm;
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

  createSubmit(){
    console.log('createSubmit');
    if(this.password() !== this.repeat()){
      //reject form submission here
      console.log('passwords dont match');
    }
    var mydate = this.birthdate();
    var age = moment(mydate).fromNow();
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

  createForm(ctrl) {
    return m('form.createAccount',[
        m("input.username.col-md-12[placeholder='Email Address'][name=username]",
          {oninput: m.withAttr("value", ctrl.vm.username)},
          ctrl.vm.username()),
        m("input.password.col-md-6[placeholder=Password][name=password][type=password]",
          {oninput: m.withAttr("value", ctrl.vm.password)},
          ctrl.vm.password()),
        m("input.repeat.col-md-6[placeholder='Repeat Password'][name=repeat][type=password]",
          {oninput: m.withAttr("value", ctrl.vm.repeat)},
          ctrl.vm.repeat()),
        //m("input.birthdate[placeholder='yyyy-mm-dd'][name=birthdate][type=date][data-format=yyyy-MM-dd][data-native=mobile]", {onchange: m.withAttr("value", ctrl.vm.birthdate)}, ctrl.vm.birthdate()),
        m('.birthdate',
          ['Year','Month','Day'].map( (field)=>{
            return m("input.col-md-4.birthday"+field+"[placeholder='Birthday "+field+"'][name=birthday"+field+"][type=number]",
              {oninput: m.withAttr("value", ctrl.vm['birthday'+field])},
              ctrl.vm['birthday'+field]());
          } )
          ),
        m("button.col-md-12", {onclick: ()=>{ctrl.vm.createSubmit();}}, "Create Account"),
        ]);
  }

  view(ctrl) {
    let vm = ctrl.vm;
    return m('.password-login-page', [
        BS.row([
        BS.col(['col-xs-12','col-md-6'],BS.panel(this.loginForm(ctrl),'Log In')),
        BS.col(['col-xs-12','col-md-6'],BS.panel(this.createForm(ctrl),'Create Account')),
        ]),
        BS.row(BS.col(['col-xs-12'],m('.error',
          ctrl.vm.error() || "" // show error if any
          )))
        ]);
  }
};
