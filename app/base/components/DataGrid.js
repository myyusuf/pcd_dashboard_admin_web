import {
  guid
} from '../Utils';

export default class DataGrid {

  constructor(options) {
    this.id = guid();
    this.source = options.source;
    this.onSearch = options.onSearch;
    this.dataGridOptions = options.dataGridOptions;
    this.onRowDoubleClick = options.onRowDoubleClick;

  }

  render(container) {
    var _this = this;

    var dataAdapter = new $.jqx.dataAdapter(this.source, {
      formatData: function(data) {
        if(_this.onSearch){
          return _this.onSearch(data);
        }else{
          return data;
        }
      },
      downloadComplete: function(data, status, xhr) {
          if (!_this.source.totalRecords) {
              _this.source.totalRecords = data.totalRecords;
          }
      },

    });
    this.dataGridOptions['source'] = dataAdapter;
    this.dataGridOptions['altrows'] = true;
    this.dataGridOptions['columnsresize'] = true;
    // this.dataGridOptions['pagesizeoptions'] = ['50', '100', '500'];

    var dataGridContainer = $('<div style="height: 100%"></div>');
    dataGridContainer.appendTo(container);
    dataGridContainer.jqxGrid(this.dataGridOptions);

    if(this.onRowDoubleClick){
      dataGridContainer.on('rowdoubleclick', function (event){
        var args = event.args;
        var rowIndex = args.rowindex;
        var data = dataGridContainer.jqxGrid('getrowdata', rowIndex);
        _this.onRowDoubleClick(data);
      });
    }

    this.dataGridContainer = dataGridContainer;
  }

  refresh(){
    this.dataGridContainer.jqxGrid('gotopage', 0);
    this.dataGridContainer.jqxGrid('updatebounddata');
  }

  addGroup(groupName){
    this.dataGridContainer.jqxGrid('addgroup', groupName);
  }
}
