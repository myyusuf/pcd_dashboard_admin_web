import {
  guid
} from '../Utils';

export default class ComboBox {

  constructor(options) {
    this.id = guid();
    this.localData = options.localData;
    this.url = options.url;
    this.dataFields = options.dataFields;
    this.comboBoxOptions = options.comboBoxOptions;
    this.onChange = options.onChange;
    this.clearSelectionEnabled = options.clearSelectionEnabled;
    this.initialValue = options.value;
  }

  render(container) {

    var _this = this;

    var comboBoxContainer = $('<div></div>');
    comboBoxContainer.appendTo(container);
    comboBoxContainer.attr('id', this.id);

    if(this.localData){
      this.comboBoxOptions['source'] = this.localData;
    }else{
      var source =
      {
          datatype: "json",
          datafields: this.dataFields,
          url: _this.url,
          data: {

          }
      };
      var dataAdapter = new $.jqx.dataAdapter(source);
      this.comboBoxOptions['source'] = dataAdapter;
    }

    comboBoxContainer.jqxComboBox(this.comboBoxOptions);

    if(this.onChange){
      comboBoxContainer.on('change', function (event){
        _this.onChange(comboBoxContainer.val());
      });
    }

    if(this.clearSelectionEnabled){
      comboBoxContainer.on('keydown', function (event) {
      	if (event.keyCode == 8 || event.keyCode == 46) {
      		comboBoxContainer.jqxComboBox('clearSelection');
      	}
      });
    }

    if(this.initialValue){
      if(this.localData){
        comboBoxContainer.val(_this.initialValue);
      }else{
        comboBoxContainer.on('bindingComplete', function (event) {
          comboBoxContainer.val(_this.initialValue);
        });
      }

    }

    this.component = comboBoxContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.component.val();
  }
}
