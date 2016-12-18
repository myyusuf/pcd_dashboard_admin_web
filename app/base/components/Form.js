import {
  guid
} from '../Utils';

export default class Form {

  constructor(options) {
    this.id = guid();
    this.items = options.items;
    this.onValidationSuccess = options.onValidationSuccess;
    this.labelColumnWidth = options.labelColumnWidth;
    this.contentColumnWidth = options.contentColumnWidth;
  }

  render(container) {

    var _this = this;

    this.formItems = [];

    var validationRules = [];
    var form = $('<form></form>');
    form.appendTo(container);
    var table = $('<table style="width: 100%;"></table>');
    table.appendTo(form);
    for(var i=0; i<this.items.length; i++){
      var tr = $('<tr></tr>');
      tr.appendTo(table);

      var td = $('<td></td>');
      td.appendTo(tr);
      td.css('padding-top', '5px');
      td.css('padding-bottom', '5px');
      if(this.labelColumnWidth){
        td.css('width', this.labelColumnWidth);
      }

      var label = $('<span>' + this.items[i].label +'</span>');
      label.appendTo(td);

      td = $('<td></td>');
      td.appendTo(tr);
      td.css('padding-top', '3px');
      td.css('padding-bottom', '3px');
      if(this.contentColumnWidth){
        td.css('width', this.contentColumnWidth);
      }

      this.items[i].content.render(td);
      this.formItems.push({
        name: this.items[i].name,
        content: this.items[i].content
      });

      var content = this.items[i].content;
      var contentId = content.getId();

      var itemValidation = this.items[i].validation;
      if(itemValidation){
        if(itemValidation.type == 'COMBOBOX'){
          if(itemValidation.rule == 'required'){

            //---Closure
            (function f() {

              var closureContent = content;
              validationRules.push(
                {
                  input: '#' + contentId,
                  message: 'Wajib diisi',
                  action: 'select', rule: function(input){
                    var value = closureContent.getValue();
                    if(value == null || value == ''){
                      return false;
                    }else{
                      return true;
                    }
                  }
                }
              );

            })();
            //----------

          }
        }else{
          if(itemValidation.rule == 'required'){
            validationRules.push(
              { input: '#' + contentId, message: 'Wajib diisi', action: 'keyup, blur', rule: 'required' }
            );
          }
        }
      }
    }

    form.jqxValidator({
      rules: validationRules
    });

    form.on('validationSuccess', function () {
      if(_this.onValidationSuccess){
        var formValues = {};
        for(var i=0; i<_this.formItems.length; i++){
          formValues[_this.formItems[i].name] = _this.formItems[i].content.getValue();
        }
        _this.onValidationSuccess(formValues);
      }
    });

    this.form = form;
  }

  validate(){
    this.form.jqxValidator('validate');
  }
}
