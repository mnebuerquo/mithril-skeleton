export default function(ctrl) {
  let vm = ctrl.vm;


  var menuItems = vm.links.map(function makeMenuItem(link) {
            return m("li",
                m("a", {href: link.url, config: m.route}, link.title)
            );
        });

  return m('.mainmenu',
    m('ul', menuItems)
  );
}
