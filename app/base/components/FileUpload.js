import {
  guid
} from '../Utils';


//DON'T PUT THIS IN <form></form> TAG
//THIS IS NOT PART OF FORM!!!!!

export default class FileUpload {

  constructor(options) {
    this.id = guid();

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    this.uploadUrl = options.uploadUrl;
    this.fileInputName = options.fileInputName;

    this.uploadEnd = options.uploadEnd;

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
    }else{
      fileUploadOptions['width'] = 300;
    }

    if(this.height){
      fileUploadOptions['height'] = this.height;
    }

    fileUploadOptions['uploadUrl'] = this.uploadUrl;
    fileUploadOptions['fileInputName'] = this.fileInputName;
    fileUploadOptions['multipleFilesUpload'] = false;
    fileUploadOptions['autoUpload'] = true;

    fileUploadContainer.jqxFileUpload(fileUploadOptions);
    const uploadEnd = this.uploadEnd;
    if (uploadEnd) {
      fileUploadContainer.on('uploadEnd', function (event) {
          var args = event.args;
          var fileName = args.file;
          var serverResponse = args.response;
          uploadEnd(serverResponse, event);
      });
    }

    this.component = fileUploadContainer;
  }

  getId(){
    return this.id;
  }

  upload(){
    return this.component.jqxFileUpload('uploadAll');
  }
}
