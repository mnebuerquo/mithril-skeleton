var BS = require('../../helpers/bootstrap');

export default function(ctrl) {
  let vm = ctrl.vm;


  var menuItems = vm.links.map(function makeMenuItem(link) {
            return m("li[role=presentation]",
                m("a", {href: link.url, config: m.route}, link.title)
            );
        });

  return m('.mainmenu',
    BS.nav( menuItems, ['nav-pills'])
  );
}
