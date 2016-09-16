import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginService} from './pages/services/login_service';
import {EmployeeService} from './pages/services/employee_service';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {tabbarPlacement: 'bottom'}, 
  providers: [LoginService,EmployeeService]
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
