export default function(ctrl) {
	let vm = ctrl.vm;
	return m('.login', [
      m('h2','Login'),
      vm.auth.map( (item)=>{
        return m(item);
      }),
      ]);
}
