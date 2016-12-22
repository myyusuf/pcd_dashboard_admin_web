import {
  guid
} from '../Utils';

export default class FileUpload {

  constructor(options) {
    this.id = guid();

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    if(options.uploadUrl){
      this.uploadUrl = options.uploadUrl;
    }

    if(options.fileInputName){
      this.fileInputName = options.fileInputName;
    }

  }

  render(container) {
    var fileUploadContainer = $('<div></div>');
    fileUploadContainer.attr('id', this.id);
    fileUploadContainer.appendTo(container);

    var fileUploadOptions = {
      theme: 'metro'
    };

    if(this.width){
      fileUploadOptions['width'] = this.width;
    }

    if(this.height){
      fileUploadOptions['height'] = this.height;
    }

    if(this.uploadUrl){
      fileUploadOptions['uploadUrl'] = this.uploadUrl;
    }

    if(this.fileInputName){
      fileUploadOptions['fileInputName'] = this.fileInputName;
    }

    fileUploadContainer.jqxFileUpload(fileUploadOptions);

    if(this.initialValue){
      fileUploadContainer.val(this.initialValue);
    }

    this.component = fileUploadContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.component.val();
  }

  uploadFile(){
    this.component.jqxFileUpload('uploadFile', 0);
  }
}
