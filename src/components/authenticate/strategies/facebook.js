import VM from '../viewModel.js';
import * as BS from '../../../helpers/bootstrap';

export default class VMfacebook extends VM {
  constructor(args) {
    super(args);

    var vm = this;

    vm.fbResponse = m.prop('');
    vm.loginClick = false;
    vm.error = m.prop('');

    if(window.fbLoaded){
      vm.checkLoginState();
    } else {
      vm.facebookInitSDK(CONFIG.auth.facebookAppID);
    }
  }


  // login to api with facebook token
  apiLogin(){
    var vm = this;
    var response = vm.fbResponse();

    // Get our token from the api, posting facebook's accessToken
    // to api/auth/facebook/token
    var token = (response && response.authResponse && response.authResponse.accessToken) || null;

    if(!token){
      console.log('No facebook access_token!');
      return ;
    }

    var postdata = {
      'token': token
    };
    var options = {
      method: "POST",
      url: CONFIG.api.url+'auth/facebook/token',
      data: postdata,
    };
    var statuscb = ()=>{vm.statusChangeCallback(response);};
    var logout = ()=>{FB.logout(statuscb);}
    var onerror = (data)=>{vm.onError(data);};
    var onlogin = (data)=>{
      vm.afterLogin(data);
      vm.setLogoutCallback(logout);
    };
    m.request(options).then(onlogin,onerror);
  }


  // Status handler functions for after login or check status
  facebookStatusNotAuthorized(response){
    this.fbResponse(response);
    this.formReRender();
  }

  facebookStatusUnknown(response){
    this.fbResponse(response);
    this.formReRender();
  }

  facebookStatusConnected(response){
    this.fbResponse(response);
    this.formReRender();

    if(this.loginClick){
      this.apiLogin();
    }
  }



  // Callback for FB login status
  statusChangeCallback(response){
    console.log(response);
    if (response.status === 'connected') {
      this.facebookStatusConnected(response);
    } else if (response.status === 'not_authorized') {
      this.facebookStatusNotAuthorized(response);
    } else {
      this.facebookStatusUnknown(response);
    }
  }



  doFBLogin(){
    var vm = this;
    //TODO: move scope to CONFIG
    vm.loginClick = true;
    FB.login(
        (response)=>{vm.statusChangeCallback(response);},
        {scope: 'public_profile,email'}
        );
  }

  checkLoginState() {
    //More code from facebook. Login status tells us if we're already
    //in or if we need to do a FB.login() dialog.
    var vm = this;
    FB.getLoginStatus( (response)=>{ vm.statusChangeCallback(response); });
  }


  // Facebook SDK code, refactored into init code
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
      console.log('fbAsyncInit');
      //after facebook init, I want to get user login state
      window.fbLoaded = true;
      vm.checkLoginState();
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





  /*
   * View Rendering Functions
   * */

  formReRender(){
    var domel = document.getElementById('fblogin');
    if(!domel){ return; }
    m.render(domel,this.loginForm());
  }

  loginForm(){
    var vm = this;
    var form = '';
    var attrs = {
      onclick: ()=>{vm.doFBLogin();}
    }
    if(window.fbLoaded){
      form = m('button.fbbutton.col-xs-12',attrs,'Log in with Facebook');
    }
    return m('.form',[
        form,
        //m('pre',JSON.stringify(this.fbResponse(),1)),
        //m('pre',this.error()),
        ]);
  }

  view(ctrl) {
    let vm = ctrl.vm;
    return m('.facebook', [
        BS.row([
          BS.col(['col-xs-12','col-md-6'],
            BS.panel(
              m('.fblogin',{id:'fblogin'},vm.loginForm()), 'Facebook Log In')
            ),
          ])
        ]);
  };

};
