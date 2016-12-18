import {
  guid
} from '../Utils';

export default class Label {

  constructor(options) {
    this.id = guid();
    this.text = options.text;
    this.bold = options.bold;
  }

  render(container) {

    var _this = this;

    var labelContainer = $('<span>' + this.text + '</span>');
    labelContainer.appendTo(container);
    if(this.bold){
      labelContainer.css('font-weight', 'bold');
    }

  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.text;
  }
}
