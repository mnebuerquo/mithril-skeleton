export default function(ctrl) {
  let vm = ctrl.vm;

  return m('.main',[
      m('h2','Hello World!'),
      m('div','This is a test of the main route rendering.'),
      m(vm.test),
      m('div.error',vm.error()),
      m('div.value',vm.value()),
    ]);
}
