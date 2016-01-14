export default function(ctrl) {
  let vm = ctrl.vm;
  if(vm.session.isAuthenticated()){
    return m('.password','Already authenticated.');
  } else {
    return vm.view(ctrl);
  }
}
