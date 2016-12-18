import { guid } from '../base/Utils';
import Button from '../base/components/Button';
import ToggleButton from '../base/components/ToggleButton';
import TextBox from '../base/components/TextBox';
import DataGrid from '../base/components/DataGrid';
// import AddProjectWindow from '../../project/components/AddProjectWindow';
// import EditProjectWindow from '../../project/components/EditProjectWindow';

export default class ProjectList {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/projects";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'code', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'description', type: 'string' },
        ],
        id: "id",
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
          { text: 'Kode', datafield: 'stambuk_lama', width: '33.33%' },
          { text: 'Nama', datafield: 'stambuk_baru', width: '33.33%' },
          { text: 'Deskripsi', datafield: 'nama', width: '33.33%'},
        ],
        groups: []
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        var editProjectWindow = new EditProjectWindow({
          data: data,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        editProjectWindow.render($('#dialogWindowContainer'));
        editProjectWindow.open();
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

    var addProjectButton = new Button({
      title:'Tambah Proyek',
      template: 'primary',
      height: 26,
      onClick: function(){
        var addProjectWindow = new AddProjectWindow({
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        addProjectWindow.render($('#dialogWindowContainer'));
        addProjectWindow.open();
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
    addProjectButton.render(innerTd);

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
