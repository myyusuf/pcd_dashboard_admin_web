import { guid } from '../Utils';
import Button from './Button';

export default class EditWindow {

  constructor(options) {
    this.id = guid();
    this.content = options.content;

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

    if(options.buttons){

    }else{
      this.deleteButton = new Button({
        title: 'Delete',
        template: 'danger',
        onClick: function(){
          if(options.onDelete){
            options.onDelete();
          }
        }
      });

      this.saveButton = new Button({
        title: 'Save',
        template: 'success',
        onClick: function(){
          if(options.onSave){
            options.onSave();
          }
        }
      });

      this.cancelButton = new Button({
        title: 'Cancel',
        onClick: function(){
          if(options.onCancel){
            options.onCancel();
          }
        }
      });
    }

  }

  render(container) {

    var _this = this;

    var windowContainer = $('<div></div>');
    windowContainer.appendTo(container);

    windowContainer.attr('id', this.id);

    var windowTitle = $('<div>' + this.title + '</div>');
    windowTitle.appendTo(windowContainer);

    var windowContent = $('<div></div>');
    windowContent.appendTo(windowContainer);

    var windowOptions = {
      theme: 'metro',
      isModal: true,
      autoOpen: false
    }

    if(this.width){
      windowOptions['width'] = this.width;
    }

    if(this.height){
      windowOptions['height'] = this.height;
    }

    windowContainer.jqxWindow(windowOptions);

    windowContainer.on('close', function (event) {
      windowContainer.jqxWindow('destroy');
    });

    var table = $('<table style="height: 100%; width: 100%;"></table>');
    var tr = $('<tr></tr>');
    var td = $('<td></td>');
    table.appendTo(windowContent);
    tr.appendTo(table);
    td.appendTo(tr);
    this.content.render(td);

    tr = $('<tr></tr>');
    td = $('<td></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
    var innerTr = $('<tr></tr>');
    var innerTd = $('<td style="width: 90%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);

    innerTd = $('<td></td>');
    innerTd.appendTo(innerTr);
    innerTd.css('padding-right', '20px');
    this.deleteButton.render(innerTd);

    innerTd = $('<td></td>');
    innerTd.appendTo(innerTr);
    this.cancelButton.render(innerTd);

    innerTd = $('<td></td>');
    innerTd.appendTo(innerTr);
    this.saveButton.render(innerTd);

    this.windowContainer = windowContainer;

  }

  getId(){
    return this.id;
  }

  open(){
    this.windowContainer.jqxWindow('open');
  }

  close(){
    this.windowContainer.jqxWindow('close');
  }

  destroy(){
    this.windowContainer.jqxWindow('destroy');
  }
}
