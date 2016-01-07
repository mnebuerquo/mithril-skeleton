export default function layout(contentView){
  return function (ctrl) {
    let menu = require('../components/menu');
    let footer = require('../components/footer');
    return m(".layout",[
        m('nav', menu),
        m('main',contentView(ctrl)),
        m('footer',footer)
    ]);
  }
}
