import {
  guid
} from '../Utils';

export default class PasswordInput{

  constructor(options) {
    this.id = guid();

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    this.placeHolder = options.placeHolder;

    this.disabled = options.disabled;
  }

  render(container) {
    var textBoxContainer = $('<input type="password" />');
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

    if(this.disabled){
      textBoxOptions['disabled'] = this.disabled;
    }

    textBoxContainer.jqxPasswordInput(textBoxOptions);

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
