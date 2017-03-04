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

    var url = "/api/project_progress";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'project_code', type: 'string'},
          { name: 'month', type: 'int' },
          { name: 'year', type: 'int' },
          { name: 'rkap_ok', type: 'float' },
          { name: 'rkap_op', type: 'float' },
          { name: 'rkap_lk', type: 'float' },
          { name: 'prognosa_ok', type: 'float' },
          { name: 'prognosa_op', type: 'float' },
          { name: 'prognosa_lk', type: 'float' },
          { name: 'realisasi_ok', type: 'float' },
          { name: 'realisasi_op', type: 'float' },
          { name: 'realisasi_lk', type: 'float' },
          { name: 'description', type: 'string' },
        ],
        id: "id",
        url: url
    };

    var onSearch = function(data) {
          data['searchTxt'] = searchTextBox.getValue();
          return data;
    }

    var columnWidth = (100 / 12) + '%' ;
    var dataGridOptions = {
        width: '100%',
        height: '100%',
        groupable: true,
        pageable: true,
        altrows: true,
        theme: 'metro',
        virtualmode: true,
        rendergridrows: function (params) {
                    return params.data;
                },
        columns: [
          { text: 'Project Code', datafield: 'project_code', width: columnWidth},
          { text: 'Bulan', datafield: 'month', width: columnWidth},
          { text: 'Tahun', datafield: 'year', width: columnWidth },
          { text: 'RKAP OK', datafield: 'rkap_ok', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },
          { text: 'RKAP OP', datafield: 'rkap_op', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },
          { text: 'RKAP LK', datafield: 'rkap_lk', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },

          { text: 'Prognosa OK', datafield: 'prognosa_ok', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },
          { text: 'Prognosa OP', datafield: 'prognosa_op', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },
          { text: 'Prognosa LK', datafield: 'prognosa_lk', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },

          { text: 'Realisasi OK', datafield: 'realisasi_ok', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },
          { text: 'Realisasi OP', datafield: 'realisasi_op', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' },
          { text: 'Realisasi LK', datafield: 'realisasi_lk', width: columnWidth, cellsalign: 'right', cellsformat: 'd2' }
        ],
        groups: ['project_code']
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        // var editProjectWindow = new EditProjectWindow({
        //   data: data,
        //   onSaveSuccess: function(){
        //     _this.dataGrid.refresh();
        //   }
        // });
        // editProjectWindow.render($('#dialogWindowContainer'));
        // editProjectWindow.open();
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

    // var fileUpload = new FileUpload({height: 35, width: 103, uploadUrl: '/project_progress/upload', fileInputName: 'progress'});
    var fileUpload = new FileUpload({
      height: 35,
      width: 103,
      uploadUrl: 'project_progress/upload',
      fileInputName: 'progress'
    });

    // var uploadButton = new Button({
    //   title:'Upload',
    //   template: 'primary',
    //   height: 26,
    //   onClick: function(){
    //     fileUpload.uploadFile();
    //   }
    // });

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

    // innerTd = $('<td style="padding-top: 6px; width: 70px; height: 100%;"></td>');
    // innerTd.appendTo(innerTr);
    // uploadButton.render(innerTd);

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
