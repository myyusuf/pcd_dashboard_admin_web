import {
  guid
} from '../Utils';

export default class DateRange {

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

    var dateRangeContainer = $('<div></div>');
    dateRangeContainer.appendTo(container);
    dateRangeContainer.attr('id', this.id);

    var dateRangeOptions =
    {
      theme: 'metro',
      selectionMode: 'range'
    };

    if(this.width){
      dateRangeOptions['width'] = this.width;
    }

    if(this.height){
      dateRangeOptions['height'] = this.height;
    }

    dateRangeContainer.jqxDateTimeInput(dateRangeOptions);

    if(this.initialValue){
        if(this.initialValue.startDate != null && this.initialValue.endDate != null){
          var startDate = new Date(this.initialValue.startDate);
          var endDate = new Date(this.initialValue.endDate);
          dateRangeContainer.jqxDateTimeInput('setRange', startDate, endDate);
        }else{
          dateRangeContainer.jqxDateTimeInput('setRange', null, null);
        }
    }

    this.dateRangeContainer = dateRangeContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.dateRangeContainer.jqxDateTimeInput('getRange');
  }
}
