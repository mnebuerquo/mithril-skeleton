import m from 'mithril';

class Session{
  constructor(config){
    this.config = config;
    this.token = m.prop('');
    this.user = m.prop({});
    this.currentRoute = m.prop('');
  }

  isAuthenticated() {
    if(this.token() ){
      return true;
    }else{
      return false;
    }
  }

  xhrConfig(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer "+this.token);
  }

  getUser() {
    return m.request({method: 'GET', url: this.config.api.url+'user', config: this.xhrConfig});
  }

}

var config = require('../config');
var _session = null;

var session = ()=>{
  if(!_session){
    _session = new Session(config);
  }
  return _session;
}

export default session;

