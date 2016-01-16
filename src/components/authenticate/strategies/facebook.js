import VM from '../viewModel.js';
import * as BS from '../../../helpers/bootstrap';

export default class VMfacebook extends VM {
  constructor(args) {
    super(args);
    var vm = this;

    vm.fbLoaded = m.prop('');
    vm.fbConnected = m.prop('');
    vm.fbStatus = m.prop('nothing');


    return vm;
  }



  facebookStatusNotAuthorized(response){
    console.log('Facebook not authorized.');
    this.fbConnected(false);
    //FB.login();
    this.fbStatus(response.status);
    m.redraw();
  }

  facebookStatusConnected(response){
    console.log('Facebook Logged in.');
    this.fbConnected(true);
    //Get token!
    this.fbStatus(response.status);
    m.redraw();
  }

  facebookStatusUnknown(response){
    console.log('Facebook unknown status.');
    this.fbConnected(false);
    //FB.login();
    this.fbStatus(response.status);
    m.redraw();
  }

  facebookAfterInit(){
    var vm = this;
    vm.fbLoaded(true);
    vm.fbStatus('loaded');
    //More code from facebook. Login status tells us if we're already
    //in or if we need to do a FB.login() dialog.
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        vm.facebookStatusConnected(response);
      } else if (response.status === 'not_authorized') {
        vm.facebookStatusNotAuthorized(response);
      } else {
        vm.facebookStatusUnknown(response);
      }
      m.render();
    });
  }

  facebookInitSDK(appId){
    var vm = this;
    //This code comes from facebook, and is normally just pasted in a
    //script tag in the top of the page.
    //I'm putting this code in here, to be called by the view.
    window.fbAsyncInit = function() {
      FB.init({
        appId      : appId,
        xfbml      : false,
        version    : 'v2.5'
      });
      vm.facebookAfterInit();
      m.render();
    };
    //This call loads the sdk and calls fbAsyncInit after loaded.
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  loginForm(ctrl){
    if(this.fbLoaded()){
      if(this.fbConnected()){
        return m('.fb','Logged through Facebook!');
      } else {
        return m('.fb','Not logged in yet!');
      }
    } else {
      return m('.fb','Facebook Login Loading...');
    }
  }

  view(ctrl) {
    let vm = ctrl.vm;
    vm.facebookInitSDK(CONFIG.auth.facebookAppID);
    return m('.facebook', [
        BS.row([
          BS.col(['col-xs-12','col-md-6'],BS.panel( vm.loginForm(ctrl),'Facebook Log In')),
          ]),
        m('.loading',vm.fbLoaded()),
        m('.connecting',vm.fbConnected()),
        m('.fbstatus',vm.fbStatus()),
        ]);
  }
};
