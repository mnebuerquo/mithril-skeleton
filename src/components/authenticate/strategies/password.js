import VM from '../viewModel.js';

export default class VMpassword extends VM {

  constructor(args) {
    super(args);

    this.username = m.prop('');
    this.password = m.prop('');
    this.repeat = m.prop('');
    this.birthdate = m.prop('');
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
    }
    var postdata = {username: this.username(), password: this.password(), birthdate: this.birthdate()};
    var postargs = {method: "POST", url: this.apiUrl+"auth/local/signup", data: postdata};
    return m.request(postargs).then(data.saved.bind(this, true), data.error);
  }

  loginForm(ctrl) {
    return m('.login',[
        m("input.username[placeholder=name][name=username]", {oninput: m.withAttr("value", ctrl.vm.username)}, ctrl.vm.username()),
        m("input.password[placeholder=password][name=password][type=password]", {oninput: m.withAttr("value", ctrl.vm.password)}, ctrl.vm.password()),
        m("button", {onclick: ()=>{ctrl.vm.loginSubmit();}}, "Login"),
        ]);
  }

  createForm(ctrl) {
    return m('form.createAccount',[ ]);
  }

  view(ctrl) {
    let vm = ctrl.vm;
    return m('.password', [
        this.loginForm(ctrl),
        this.createForm(ctrl),
        m('.error',
          ctrl.vm.error() || "" // show error if any
          ),
        ]);
  }
};
