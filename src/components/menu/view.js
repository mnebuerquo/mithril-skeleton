export default function(ctrl) {
  let vm = ctrl.vm;


  var links = [
    { title: 'Login', url: '/login' },
    { title: 'Logout', url: '/logout' },
    { title: 'Profile', url: '/profile' },
  ];

  var menuItems = links.map(function makeMenuItem(link) {
            return m("li",
                m("a", {href: link.url, config: m.route}, link.title)
            );
        });

  return m('.mainmenu',
    m('ul', menuItems)
  );
}
