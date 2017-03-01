import { guid } from '../base/Utils';
import Button from '../base/components/Button';
import Form from '../base/components/Form';
import EditWindow from '../base/components/EditWindow';
import TextBox from '../base/components/TextBox';
import TextArea from '../base/components/TextArea';
import Label from '../base/components/Label';
import ProjectTypeComboBox from "./ProjectTypeComboBox";

export default class EditProjectWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var project = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var codeTextBox = new TextBox({value: project.code, disabled: true, height: 25, width: '90%'});
    var nameTextBox = new TextBox({value: project.name, height: 25, width: '90%'});
    var projectTypeComboBox = new ProjectTypeComboBox({value: project.projectType, height: 80, width: '92.5%'});
    var descriptionTextBox = new TextArea({value: project.description, height: 80, width: '92.5%'});

    var formItems = [
      {
        name: 'code',
        label: 'Code',
        content: codeTextBox,
        validation:{
          type: 'TEXTBOX',
          rule: 'required'
        }
      },
      {
        name: 'name',
        label: 'Name',
        content: nameTextBox,
        validation:{
          type: 'TEXTBOX',
          rule: 'required'
        }
      },
      {
        name: 'project_type',
        label: 'Type',
        content: projectTypeComboBox,
        validation:{
          type: 'COMBOBOX',
          rule: 'required'
        }
      },
      {
        name: 'description',
        label: 'Description',
        content: descriptionTextBox
      },
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "PUT",
              url: "/api/projects/" + project.code,
              data: JSON.stringify(formValue),
              beforeSend: function(xhr){
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
              }
            }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(_this.onSaveSuccess){
                  _this.onSaveSuccess();
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
            });
      }
    }

    var form = new Form(formOptions);

    this.window = new EditWindow({
      width: 390,
      height: 280,
      title: 'Edit Project',
      content: form,
      onSave: function(){
        form.validate();
      },
      onCancel: function(){
        _this.window.close();
      },
      onDelete: function(){
        var r = confirm("Proses hapus data akan dilakukan!");
        if (r == true) {
          $.ajax({
                method: "DELETE",
                url: "/api/projects/" + project.code,
                data: { }
              }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(_this.onSaveSuccess){
                  _this.onSaveSuccess();
                }
              }).fail(function(jqXHR, textStatus, errorThrown) {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
              });
        }
      }
    });
  }

  render(container) {
    var _this = this;
    this.window.render(container);
  }

  open(){
    this.window.open();
  }
}
