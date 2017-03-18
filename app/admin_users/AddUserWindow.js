import { guid } from '../base/Utils';
import Button from '../base/components/Button';
import Form from '../base/components/Form';
import AddWindow from '../base/components/AddWindow';
import TextBox from '../base/components/TextBox';
import Label from '../base/components/Label';
import PasswordInput from "../base/components/PasswordInput";

export default class AddUserWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.onSaveSuccess = options.onSaveSuccess;

    var usernameTextBox = new TextBox({height: 25, width: '90%'});
    var passwordInput = new PasswordInput({height: 25, width: '90%'});
    var nameTextBox = new TextBox({height: 25, width: '90%'});
    var emailTextBox = new TextBox({height: 25, width: '90%'});

    var formItems = [
      {
        name: 'username',
        label: 'Username',
        content: usernameTextBox,
        validation:{
          type: 'TEXTBOX',
          rule: 'required'
        }
      },
      {
        name: 'password',
        label: 'Password',
        content: passwordInput,
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
        name: 'email',
        label: 'Email',
        content: emailTextBox
      }
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "POST",
              url: "/adminusers",
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
            }).fail(function( jqXHR, textStatus, errorThrown) {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
            });
      }
    }

    var form = new Form(formOptions);

    this.window = new AddWindow({
      width: 390,
      height: 280,
      title: 'Add User',
      content: form,
      onSave: function(){
        form.validate();
      },
      onCancel: function(){
        _this.window.close();
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
