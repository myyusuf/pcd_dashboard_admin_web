import { guid } from '../base/Utils';
import Button from '../base/components/Button';
import ToggleButton from '../base/components/ToggleButton';
import TextBox from '../base/components/TextBox';
import DataGrid from '../base/components/DataGrid';
import AddUserWindow from '../admin_users/AddUserWindow';
import EditUserWindow from '../admin_users/EditUserWindow';

export default class UserList {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/adminusers";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'username', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'email', type: 'string' }
        ],
        id: "username",
        url: url
    };

    var onSearch = function(data) {
          data['searchTxt'] = searchTextBox.getValue();
          return data;
    }

    var dataGridOptions = {
        width: '100%',
        height: '100%',
        pageable: true,
        altrows: true,
        theme: 'metro',
        virtualmode: true,
        rendergridrows: function (params) {
                    return params.data;
                },
        columns: [
          { text: 'Username', datafield: 'username', width: '30%' },
          { text: 'Name', datafield: 'name', width: '40%' },
          { text: 'Email', datafield: 'email', width: '30%' },
        ],
        groups: []
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        var editUserWindow = new EditUserWindow({
          data: data,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        editUserWindow.render($('#dialogWindowContainer'));
        editUserWindow.open();
      },
      dataGridOptions: dataGridOptions
    });

    var searchTextBox = new TextBox({placeHolder: 'Kode atau Nama', width: 250, height: 24});
    var searchButton = new Button({
      imgSrc:'/pcd_assets/images/search.png',
      theme: 'metro',
      width: 30,
      height: 26,
      onClick: function(){
        _this.dataGrid.refresh();
      }
    });

    var addUserButton = new Button({
      title:'Tambah User',
      template: 'primary',
      height: 26,
      onClick: function(){
        var addUserWindow = new AddUserWindow({
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        addUserWindow.render($('#dialogWindowContainer'));
        addUserWindow.open();
      }
    });

    var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);

    var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
    var innerTr = $('<tr></tr>');
    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 50px; height: 100%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);
    addUserButton.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; width: 200px; height: 100%;"></td>');
    innerTd.appendTo(innerTr);
    searchTextBox.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
    var _tempContainer = $('<div style="margin-left: -5px;"></div>')
    _tempContainer.appendTo(innerTd);
    innerTd.appendTo(innerTr);
    searchButton.render(_tempContainer);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    this.dataGrid.render(td);

  }
}
