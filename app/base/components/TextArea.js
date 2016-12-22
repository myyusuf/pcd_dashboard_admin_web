import {
  guid
} from '../Utils';

export default class TextArea {

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
    var textAreaContainer = $('<textarea></textarea>');
    textAreaContainer.attr('id', this.id);
    textAreaContainer.appendTo(container);

    var textAreaOptions = {
      theme: 'metro'
    };

    if(this.width){
      textAreaOptions['width'] = this.width;
    }

    if(this.height){
      textAreaOptions['height'] = this.height;
    }

    if(this.placeHolder){
      textAreaOptions['placeHolder'] = this.placeHolder;
    }

    textAreaContainer.jqxInput(textAreaOptions);

    if(this.initialValue){
      textAreaContainer.val(this.initialValue);
    }

    this.component = textAreaContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.component.val();
  }
}
