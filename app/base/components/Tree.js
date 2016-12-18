import {
  guid
} from '../Utils';

export default class Tree {

  constructor(options) {
    this.id = guid();
    this.source = options.data;
    this.onClick = options.onClick;
  }

  render(container) {

    var _this = this;

    var treeContainer = $('<div></div>');
    treeContainer.appendTo(container);
    treeContainer.jqxTree({
      theme: 'metro',
      // source: this.records,
      source: this.source,
      width: '100%',
      height: '100%'
    });

    treeContainer.on('itemClick',function (event)
    {
        var args = event.args;
        var item = treeContainer.jqxTree('getItem', args.element);
        if(_this.onClick){
          _this.onClick(item);
        }
    });
  }
}
