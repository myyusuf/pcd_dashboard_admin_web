import { guid } from '../base/Utils';
import Button from '../base/components/Button';
import ToggleButton from '../base/components/ToggleButton';
import TextBox from '../base/components/TextBox';
import DataGrid from '../base/components/DataGrid';
import FileUpload from '../base/components/FileUpload';
import AddProjectWindow from '../project/AddProjectWindow';
import EditProjectWindow from '../project/EditProjectWindow';

export default class ProjectProgressList {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/project_progress";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'month', type: 'int' },
          { name: 'year', type: 'int' },
          { name: 'rkapOk', type: 'int' },
          { name: 'rkapOp', type: 'int' },
          { name: 'rkapLk', type: 'int' },
          { name: 'prognosaOk', type: 'int' },
          { name: 'prognosaOp', type: 'int' },
          { name: 'prognosaLk', type: 'int' },
          { name: 'realisasiOk', type: 'int' },
          { name: 'realisasiOp', type: 'int' },
          { name: 'realisasiLk', type: 'int' },
          { name: 'description', type: 'string' },
        ],
        id: "id",
        url: url
    };

    var onSearch = function(data) {
          data['searchTxt'] = searchTextBox.getValue();
          return data;
    }

    var columnWidth = (100 / 5) + '%' ;
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
          { text: 'Bulan', datafield: 'month', width: columnWidth },
          { text: 'Tahun', datafield: 'year', width: columnWidth },
          { text: 'RKAP OK', datafield: 'rkapOk', width: columnWidth },
          { text: 'RKAP OP', datafield: 'rkapOp', width: columnWidth },
          { text: 'RKAP LK', datafield: 'rkapLk', width: columnWidth }
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

    var fileUpload = new FileUpload({height: 35, width: 103, uploadUrl: '/project_progress/upload', fileInputName: 'progress'});

    var uploadButton = new Button({
      title:'Upload',
      template: 'primary',
      height: 26,
      onClick: function(){
        fileUpload.uploadFile();
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
    fileUpload.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; width: 70px; height: 100%;"></td>');
    innerTd.appendTo(innerTr);
    uploadButton.render(innerTd);

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
