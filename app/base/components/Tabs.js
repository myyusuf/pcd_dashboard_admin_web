import { guid } from '../Utils';

export default class Tabs {


  constructor(items) {
    this.id = guid();
    this.items = items;
  }

  render(container) {
    var tabContainer = $('<div style="margin-top: -1px;"></div>');
    tabContainer.appendTo(container);
    tabContainer.attr('id', this.id);
    var ul = $('<ul></ul>');
    ul.appendTo(tabContainer);

    for (var i = 0; i < this.items.length; i++) {

      var title = $('<li>' + this.items[i].title + '</li>');
      title.appendTo(ul);
    }

    var tempContainer = [];
    for (var i = 0; i < this.items.length; i++) {

      var contentContainer = $('<div></div>');
      contentContainer.appendTo(tabContainer);
      tempContainer.push(contentContainer);
    }


    tabContainer.jqxTabs({
      theme: 'metro',
      position: 'top',
      showCloseButtons: true,
      width: '100%',
      height: '100.5%'
    });

    for (var i = 0; i < this.items.length; i++) {

      if(this.items[i].content){
        this.items[i].content.render(tempContainer[i]);
      }
    }

    this.component = tabContainer
  }

  add(childTabId, title, content){

    var id = this.id + '_'  + childTabId;
    var _contentContainer = '<div id="' + id + '" style="height: 100%;"></div>';
    this.component.jqxTabs('addLast', title, _contentContainer);

    content.render($('#' + id));

  }

  selectTabByTitle(title){
    var tabFound = false;
    var tabsLength = this.component.jqxTabs('length');

    for(var i=0; i<tabsLength; i++){
      var tabTitle = this.component.jqxTabs('getTitleAt', i);
      if(title == tabTitle){
        tabFound = true;
        this.component.jqxTabs('select', i);
        break;
      }
    }

    return tabFound;
  }
}
