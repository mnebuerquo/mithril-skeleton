var session = require('../../models/session.js');

export default class VM {
  constructor(args) {
    var vm = this;
    vm.session = session();
    vm.links = [
      { title: 'Main', url: '/' },
      { title: 'Profile', url: '/profile' },
    ];

    // check for logged in
    let sess = session();
    if(sess.isAuthenticated()){
      vm.links.push( { title: 'Logout', url: '/logout' });
    } else {
      vm.links.push( { title: 'Login', url: '/login' } );
    }

    return vm;
  }
};
