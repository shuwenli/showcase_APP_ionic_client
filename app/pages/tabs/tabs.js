import {Page} from 'ionic-angular';
import {EmployeeListPage} from '../employee-list/employee-list';
import {NewsPage} from '../news/news';
import {SettingPage} from '../setting/setting';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
       
    this.newsRoot = NewsPage;
    this.contactsRoot = EmployeeListPage;
    this.settingRoot = SettingPage;
  }
}
