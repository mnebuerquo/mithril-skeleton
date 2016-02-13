import m from 'mithril';

class Session{
  constructor(sk_conf){
    this.sk_conf = sk_conf;
    this.user = m.prop({});
    if(!localStorage.access_token){
      localStorage.access_token='';
    }
    this._token = m.prop(localStorage.access_token);
    this.currentRoute = m.prop('');
    this.token = function (){
      if(!arguments.length){
        return this._token();
      } else {
        this._token(arguments[0]);
        localStorage.access_token = this._token();
        this.getUser();
      }
    }
    if(this.token()){
      this.getUser();
    }
    this.logoutCallback = ()=>{};
  }

  logOut(){
    this.token('');
    this.user({});
    if(this.logoutCallback){
      this.logoutCallback();
      this.logoutCallback = ()=>{};
    }
  }

  isAuthenticated() {
    if(this.token() ){
      return true;
    }else{
      return false;
    }
  }

  xhrConfig() {
    let token = this.token();
    return function(xhr){
      xhr.setRequestHeader("Authorization", "Bearer "+token);
    }
  }

  getUser() {
    let self = this;
    m.request({
      method: 'GET',
      url: this.sk_conf.api.url+'v0/token/user',
      config: this.xhrConfig(),
    }).then(
      function(user){
        self.user(user);
      }
    );
  }

}

var sk_conf = CONFIG.config;
var _session = null;

var session = ()=>{
  if(!_session){
    _session = new Session(sk_conf);
  }
  return _session;
}

export default session;

