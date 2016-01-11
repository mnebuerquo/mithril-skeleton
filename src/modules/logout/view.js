export default function(ctrl) {
	let vm = ctrl.vm;
	return m('.logout', [
      m('h2','Log Out'),
      m('div','You have been logged out.'),
      m("a", {href: '/', config: m.route}, 'Return to main page.')
      ]);
}
