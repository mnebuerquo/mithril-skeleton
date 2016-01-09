export default function(ctrl) {
  let vm = ctrl.vm;
  if(vm.session.isAuthenticated()){
    return m('.password','');
  } else {
    return vm.view(ctrl);
  }
}
