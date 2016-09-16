import {Page,Modal,NavController} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';
import {AuthService} from '../services/auth';

import {provide} from 'angular2/core';
import {Http} from 'angular2/http';
import {AuthHttp,AuthConfig} from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Page({
  templateUrl: 'build/pages/news/news.html',
  providers: [ AuthService,
               provide(AuthHttp, { useFactory: (http) => {
                                  return new AuthHttp(new AuthConfig(), http);
                                     }, deps: [Http] 
                                 }
                      ),
              ]
})
export class NewsPage {
  static get parameters() {
    return [[NavController],[Http],[AuthHttp]];
  }

  constructor(nav,http,authHttp) {
     this.nav = nav;
     this.auth = AuthService;
     this.http = http;
     this.authHttp = authHttp;
     this.API = "http://192.168.0.159:3001/api";
     this.quote ="";
     this.error ="";
  //   this.showModal();
  }

  ngAfterViewInit(){
//    if(!this.auth.authenticated()){
 //      this.showModal();
//    }

  }

  showModal() {
    var modal = Modal.create(ProfilePage);
    this.nav.present(modal);
  }

  getQuote() {
    this.http.get(`${this.API}/random-quote`)
      .map(res => res.text())
      .subscribe(
        data => this.quote = data,
        err => this.error = err
      );
  }

  getSecretQuote() {
    this.authHttp.get(`${this.API}/protected/random-quote`)
      .map(res => res.text())
      .subscribe(
        data => this.quote = data,
        err => this.error = err
      );
  }
}
