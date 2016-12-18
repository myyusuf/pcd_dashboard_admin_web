import {
  guid
} from '../Utils';

export default class NumberInput {

  constructor(options) {
    this.id = guid();

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    this.initialValue = options.value;
  }

  render(container) {

    var _this = this;

    var numberInputContainer = $('<div></div>');
    numberInputContainer.appendTo(container);
    numberInputContainer.attr('id', this.id);

    var numberInputOptions =
    {
      theme: 'metro',
    };

    if(this.width){
      numberInputOptions['width'] = this.width;
    }

    if(this.height){
      numberInputOptions['height'] = this.height;
    }
    numberInputContainer.jqxNumberInput(numberInputOptions);

    if(this.initialValue){
      numberInputContainer.val(this.initialValue);
    }

    this.numberInputContainer = numberInputContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.numberInputContainer.val();
  }
}
