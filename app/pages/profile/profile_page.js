import {IonicApp,Page, Storage, LocalStorage,NavController} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../services/auth';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/profile/profile.html',
  directives: [FORM_DIRECTIVES],
  providers: [AuthService],
})
export class ProfilePage {

  static get parameters() {
    return [[NavController],[Http],[IonicApp]];
  }

  constructor(nav,http,app) {
    this.app = app;
    this.http = http;
    this.nav = nav;
    this.LOGIN_URL = "http://192.168.0.159:3001/sessions/create";
    this.SIGNUP_URL = "http://192.168.0.159:3001/users";
    this.SIGNUP_SMS_URL = "http://192.168.0.159:3001/mobiles";
    this.contentHeader = new Headers({"Content-Type": "application/json"});

    this.auth = AuthService;
    this.local = new Storage(LocalStorage);
    this.jwtHelper = new JwtHelper();
    this.authType = "login";
    this.user = "";
    this.error ="";

    this.local.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });
  }

  login(credentials) {
    this.http.post(this.LOGIN_URL, JSON.stringify(credentials), {headers: this.contentHeader})
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.id_token),
        err => this.error = err
      );
  }

  signup(credentials) {
      alert("signup")
      alert(JSON.stringify(credentials));
      this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), {headers: this.contentHeader} )
      .map(res => res.json())
      .subscribe(
        data => { 
                  alert(data.prompt);
                  this.authSuccess(data.id_token);
        },
        err => {
                  this.error = err;
                  alert(JSON.stringify(err));
        }
      );

  }
  
  getcode(credentials) {
      alert("getcode");
      alert(JSON.stringify(credentials));
      this.http.post(this.SIGNUP_SMS_URL, JSON.stringify(credentials), {headers: this.contentHeader} )
      .map(res => res.json())
      .subscribe(
        data => {
                  alert(data.prompt);
        },
        err => {
                  this.error = err;
                  alert(JSON.stringify(err));
        }
      );

  }


  logout() {
    this.local.remove('id_token');
    this.user = null;
   // this.nav.popToRoot();
    var tabs = this.app.getComponent('myTabs');
    tabs.select(0);
  }

  authSuccess(token) {
    alert(token);
    this.error = null;
    this.local.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
    //var tabs = this.app.getComponent('myTabs');
    //tabs.select(0);
    this.nav.pop();
  }

  verifyMobile(employee) {
    this.nav.push(EmployeeDetailsPage, {
        employee: employee,
    });
  }
}
