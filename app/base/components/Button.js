import { guid } from '../Utils';

export default class Button {

  constructor(options) {
    this.id = guid();
    this.onClick = options.onClick;

    if(options.title){
      this.title = options.title;
    }else{
      this.title = '';
    }

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    if(options.imgSrc){
      this.imgSrc = options.imgSrc;
    }

    this.template = options.template;
    this.theme = options.theme;
  }

  render(container) {
    var _this = this;

    var buttonContainer = $('<input type="button" value="' + this.title + '" />');
    buttonContainer.attr('id', this.id);
    buttonContainer.appendTo(container);

    var buttonOptions = {
      theme: 'light'
    };

    if(this.template){
      buttonOptions['template'] = this.template;
    }

    if(this.theme){
      buttonOptions['theme'] = this.theme;
    }

    if(this.width){
      buttonOptions['width'] = this.width;
    }

    if(this.height){
      buttonOptions['height'] = this.height;
    }

    if(this.imgSrc){
      buttonOptions['imgSrc'] = this.imgSrc;
    }

    buttonContainer.jqxButton(buttonOptions);

    if(this.onClick){
      $('#' + this.id).on('click', function () {
        _this.onClick();
      });
    }

  }
}
