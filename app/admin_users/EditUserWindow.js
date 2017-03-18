import { guid } from '../base/Utils';
import Button from '../base/components/Button';
import Form from '../base/components/Form';
import EditWindow from '../base/components/EditWindow';
import TextBox from '../base/components/TextBox';
import TextArea from '../base/components/TextArea';
import Label from '../base/components/Label';

export default class EditUserWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var user = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var usernameTextBox = new TextBox({value: user.username, disabled: true, height: 25, width: '90%'});
    var nameTextBox = new TextBox({value: user.name, height: 25, width: '90%'});
    var emailTextBox = new TextBox({value: user.email, height: 25, width: '90%'});

    var formItems = [
      {
        name: 'username',
        label: 'Username',
        content: usernameTextBox
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
      },
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "PUT",
              url: "/adminusers/" + user.username,
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
      title: 'Edit User',
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
                url: "/adminusers/" + user.username,
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
