import {
  guid
} from '../Utils';

export default class Menu {

  constructor(options) {
    this.id = guid();
    this.data = options.data;
    this.onClick = options.onClick;
  }

  render(container) {

    var _this = this;

    var source = {
       datatype: "json",
       datafields: [
           { name: 'id' },
           { name: 'parentid' },
           { name: 'text' },
           { name: 'subMenuWidth' }
       ],
       id: 'id',
       localdata: _this.data
   };

   var dataAdapter = new $.jqx.dataAdapter(source);
   dataAdapter.dataBind();

   var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);

    var menuContainer = $('<div></div>');
    menuContainer.appendTo(container);
    menuContainer.jqxMenu({
      theme: 'metro',
      source: records,
      width: '100%',
      height: '100%'
    });

    menuContainer.on('itemclick',function (event)
    {
        var args = event.args;
        if(_this.onClick){
          _this.onClick(args.id);
        }
    });
  }
}
