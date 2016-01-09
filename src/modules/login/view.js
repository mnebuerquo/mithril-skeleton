export default function(ctrl) {
	let vm = ctrl.vm;
	return m('.login', [
      vm.auth.map( (item)=>{
        return m(item);
      }),
      ]);
}
