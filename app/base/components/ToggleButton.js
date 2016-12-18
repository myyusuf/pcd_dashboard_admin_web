import {
  guid
} from '../Utils';

export default class ToggleButton {

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

    this.onButtonToggled = options.onButtonToggled;
    this.onButtonNotToggled = options.onButtonNotToggled;
  }

  render(container) {
    var buttonContainer = $('<button>' + this.title + '</button>');
    buttonContainer.appendTo(container);

    var buttonOptions = {
      theme: 'light'
    };

    if(this.width){
      buttonOptions['width'] = this.width;
    }

    if(this.height){
      buttonOptions['height'] = this.height;
    }

    buttonContainer.jqxToggleButton(buttonOptions);

    var _this = this;

    buttonContainer.on('click', function () {
        var toggled = buttonContainer.jqxToggleButton('toggled');
        if (toggled) {
          if(_this.onButtonToggled){
            _this.onButtonToggled();
          }
        }else{
          if(_this.onButtonNotToggled){
            _this.onButtonNotToggled();
          }
        }
    });
  }
}
