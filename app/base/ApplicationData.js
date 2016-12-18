export function getMenuData(){
  var data = [
  {
      "id": "12",
      "text": "Account",
      "parentid": "-1",
      "subMenuWidth": '250px'
  },
  {
      "text": "Help",
      "id": "1",
      "parentid": "-1",
      "subMenuWidth": '250px'
  }, {
      "id": "13",
      "text": "Profile",
      "parentid": "12"
  }, {
      "id": "14",
      "text": "Logout",
      "parentid": "12"
  }];

  return data;
}
