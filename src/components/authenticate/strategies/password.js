import VM from '../viewModel.js';

import * as BS from '../../../helpers/bootstrap';

import moment from 'moment';
import {DateTriple} from '../../../lib/form-input.js';

export default class VMpassword extends VM {

  constructor(args) {
    super(args);

    var vm = this;

    vm.username = m.prop('');
    vm.password = m.prop('');
    vm.repeat = m.prop('');
    vm.birthday = m.prop('');
    vm.bderror = m.prop('');

    var options = {
      name: 'birthday',
      validators: [
        (v)=>{ return moment(v).isAfter(moment())?'Date must be in the past!':false; },
      ],
      childClasses:['col-xs-4','col-md-4'],
      classlist:[],
      placeholder: 'Birthday',
      value:vm.birthday,
      error:vm.bderror
    }
    vm.dateobj = new DateTriple(options);
    vm.datecmp = m.component(vm.dateobj);

    vm.error = m.prop('');

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
        m(ctrl.vm.datecmp),
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
