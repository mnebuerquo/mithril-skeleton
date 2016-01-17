

function stripDot(value){
  //remove leading .
  while(value.charAt(0)==='.'){ value=value.substr(1); }
  return value;
}

export function nav(itemlist,navclasses){
  if(!Array.isArray(navclasses)){navclasses=[];}
  navclasses.unshift('nav');
  navclasses = navclasses.map(stripDot);
  return m('nav',m('ul.'+navclasses.join('.'), itemlist));
}

export function row(content){
  return m('.row',content);
}

export function col(sizes, content){
  let classlist = sizes.map( (value)=>{
    if(Array.isArray(value)){
      let size = value[0];
      let num = value[1];
      return '.col-'+size+'-'+num;
    } else if(value.match(/col-(xs|sm|md|lg)-(\d+)/)){
      return '.'+stripDot(value);
    } else {
      console.log('invalid bootstrap column value');
      return '.col-xs-12';
    }
  } );

  return m(classlist.join(''), content);
}

export function panel(content, title, type, attrs){
  attrs = attrs || {};
  let heading = title?m('.panel-heading',title):'';
  let panelclass = '.panel-default';
  if(type){
    type = type.replace('panel-','');
    panelclass = '.panel-'+type;
  }
  return m('.panel'+panelclass,[
      heading,
      m('.panel-body',content)
      ]);
}
