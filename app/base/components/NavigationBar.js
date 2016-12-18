import { guid } from '../Utils';

export default class NavigationBar {

  constructor(items) {
    this.id = guid();
    this.items = items;
  }

  render(container) {
    var navigationBarContainer = $('<div></div>');
    navigationBarContainer.attr('id', this.id);
    for (var i = 0; i < this.items.length; i++) {

      var title = $('<div>' + this.items[i].title + '</div>');
      title.appendTo(navigationBarContainer);

      var contentContainer = $('<div></div>');
      contentContainer.appendTo(navigationBarContainer);

      if(this.items[i].content){
        this.items[i].content.render(contentContainer);
      }
    }
    navigationBarContainer.appendTo(container);

    navigationBarContainer.jqxNavigationBar({
      theme: 'metro',
      width: '101%',
      height: '100%'
    });
  }
}
