export default function layout(contentView){
  return function (ctrl) {
    let menu = require('../components/menu');
    let footer = require('../components/footer');
    return m(".layout.col-xs-12",[
        m(menu),
        m('.content',contentView(ctrl)),
        m(footer)
    ]);
  }
}
