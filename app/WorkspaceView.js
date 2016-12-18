import { guid } from './base/Utils';
import Button from './base/components/Button';
import ToggleButton from './base/components/ToggleButton';
import TextBox from './base/components/TextBox';
import ComboBox from "./base/components/ComboBox";

export default class WorkspaceView {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    this.searchTextBox = new TextBox({placeHolder: 'Project', width: 250, height: 24});
    var searchButton = new Button({
      onClick: function(){

      },
      imgSrc:'/pcd_assets/images/search.png',
      theme: 'metro', width: 30, height: 26
    });

    var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);

    var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
    var innerTr = $('<tr></tr>');
    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);

    innerTd = $('<td style="padding-top: 6px; height: 100%; width: 100px;"></td>');
    innerTd.appendTo(innerTr);


    innerTd = $('<td style="padding-top: 6px; height: 100%; width: 86px;"></td>');
    innerTd.appendTo(innerTr);
    // this.levelCmb.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%; width: 250px;"></td>');
    innerTd.appendTo(innerTr);
    this.searchTextBox.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
    var _tempContainer = $('<div style="margin-left: -5px;"></div>')
    _tempContainer.appendTo(innerTd);
    innerTd.appendTo(innerTr);
    searchButton.render(_tempContainer);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);
  }
}
