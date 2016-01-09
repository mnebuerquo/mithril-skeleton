import VM from '../viewModel.js';

export default class VMfacebook extends VM {
  constructor(args) {
    super(args);
    var vm = this;
    return vm;
  }

  view(ctrl) {
    let vm = ctrl.vm;
    return m('.facebook', 'Facebook Auth!');
  }
};
