import { guid } from '../base/Utils';
import ComboBox from "../base/components/ComboBox";

export default class ProjectTypeComboBox {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var typeList = [
      {id: '1', nama: "Proyek Lama Non JO/Non KSO"},
      {id: '2', nama: "Proyek Lama JO/KSO"},
      {id: '3', nama: "Proyek Baru Sudah Diperoleh Non JO/Non KSO"},
      {id: '4', nama: "Proyek Baru Sudah Diperoleh JO/KSO"},
      {id: '5', nama: "Proyek Baru Dalam Pengusahaan Non JO/Non KSO"},
      {id: '6', nama: "Proyek Baru Dalam Pengusahaan JO/KSO"},
    ];
    var comboBoxOptions = {
      displayMember: "nama",
      valueMember: "id",
      selectedIndex: 0,
      width: options.width,
      height: 25,
      theme: 'metro',
      selectionMode: 'dropDownList'
    };

    this.comboBox = new ComboBox({
      localData: typeList,
      value: options.value,
      comboBoxOptions: comboBoxOptions,
      onChange: function(value){
        if(options.onChange){
          options.onChange(value);
        }
      }
    });

  }

  getId(){
    return this.comboBox.getId();
  }

  render(container){
    this.comboBox.render(container);
  }

  getValue(){
    return this.comboBox.getValue();
  }

}
