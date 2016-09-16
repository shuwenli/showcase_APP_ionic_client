import {Page, NavController} from 'ionic-angular';
import {Employee} from '../services/employee';

@Page({
      templateUrl: 'build/pages/setting/setting.html',
})

export class SettingPage {
  static get parameters() {
    return [NavController];
  }

  constructor(nav) {
    this.nav = nav;
    this.employee = new Employee("1","WEN","shuwen","","li","+6597710088","+6566","+6577","hcl","R&D","Dev","https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flickr_-_JennyHuang_-_calm.....jpg/320px-Flickr_-_JennyHuang_-_calm.....jpg");
    
    //this.token = this.loginservice.gettoken();
    //this.decoded = this.loginservice.getdecoded();

  }



}
