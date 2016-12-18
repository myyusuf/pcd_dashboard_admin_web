import {
  guid
} from '../Utils';

export default class TextBox {

  constructor(options) {
    this.id = guid();

    if(options.title){
      this.title = options.title;
    }else{
      this.title = 'Button';
    }

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    this.placeHolder = options.placeHolder;

    this.initialValue = options.value;
  }

  render(container) {
    var textBoxContainer = $('<input type="text" />');
    textBoxContainer.attr('id', this.id);
    textBoxContainer.appendTo(container);

    var textBoxOptions = {
      theme: 'metro'
    };

    if(this.width){
      textBoxOptions['width'] = this.width;
    }

    if(this.height){
      textBoxOptions['height'] = this.height;
    }

    if(this.placeHolder){
      textBoxOptions['placeHolder'] = this.placeHolder;
    }

    textBoxContainer.jqxInput(textBoxOptions);

    if(this.initialValue){
      textBoxContainer.val(this.initialValue);
    }

    this.component = textBoxContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.component.val();
  }
}
