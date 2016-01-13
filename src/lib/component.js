// For components in mithril using es6 classes, see the following:
// https://github.com/lhorie/mithril.js/issues/618#issuecomment-101474113
// https://github.com/flarum/core/blob/master/js/lib/Component.js
//
import m from 'mithril';

// Extend this component. Usage:
// Create a component using the class:
//    vm.test = m.component(new Component({secret: 'mysecret'}),{test: 'pass'});
// Render the component in a view:
//    m(vm.test)
export default class Component {

  constructor(args){
    // This constructor just creates a controller function.
    // Just call super and get on with your component.
    var vm = this;
    vm.controller = function Controller(cArgs){
      this.vm = vm;
      vm.setControllerArgs(cArgs);
    }
  }

  view(ctrl){
    // Replace this default view with something meaningful for your
    // component.
    return m('.component','Component base view should be overridden.');
  }

  setControllerArgs(args){
    // This function is called by the controller to do any
    // initialization necessary.
    this.controllerArgs = args;
  }
}
