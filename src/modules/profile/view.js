export default function(ctrl) {
	let vm = ctrl.vm;
	return m('.profile', [
      m('h2','Profile'),
      m('div','This is a user profile.'),
      m('div',JSON.stringify(vm.session.user())),
      ]);
}
