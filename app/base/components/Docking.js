import {
  guid
} from '../Utils';

export default class Docking {

  constructor(options) {
    this.id = guid();
    this.items = options.items;
    this.itemsCountPerColumn = options.itemsCountPerColumn

    if(this.itemsCountPerColumn == undefined){
      this.itemsCountPerColumn = 3;
    }
  }

  render(container) {

    var _this = this;

    var dockingContainer = $('<div></div>');
    dockingContainer.appendTo(container);

    var innerDockingContainer = $('<div></div>');
    innerDockingContainer.appendTo(dockingContainer);

    for(var i=0; i<this.items.length; i++){
      if(i > 0 && (i % _this.itemsCountPerColumn == 0)){
        innerDockingContainer = $('<div></div>');
        innerDockingContainer.appendTo(dockingContainer);
      }

      var portletContainer = $('<div style="height: 500px; padding: 0;"></div>');
      portletContainer.appendTo(innerDockingContainer);
      var portletTitle = $('<div>' + this.items[i].title + '</div>');
      portletTitle.css('font-weight', 'bold');

      if(this.items[i].color){
        portletTitle.css('color', this.items[i].color);
      }

      portletTitle.appendTo(portletContainer);
      var portletBody = $('<div style="overflow: hidden; padding: 0;"></div>');
      portletBody.appendTo(portletContainer);
      this.items[i].content.render(portletBody);
    }

    dockingContainer.jqxDocking({
      theme: 'metro',
      orientation: 'horizontal',
      mode: 'docked',
      width: '100%',
      height: '100%'
    });



  }
}
