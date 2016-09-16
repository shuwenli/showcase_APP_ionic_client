import {Page, NavController} from 'ionic-angular';
import {JwtHelper} from 'angular2-jwt';
import {LoginService} from '../services/login_service';

@Page({
      templateUrl: 'build/pages/setting/setting.html',
})

export class SettingPage {
  static get parameters() {
    return [[NavController],[LoginService]];
  }

  constructor(nav,loginservice) {
    this.nav = nav;
    this.jwtHelper = new JwtHelper();
    this.loginservice = loginservice;
    //this.token = this.loginservice.gettoken();
    //this.decoded = this.loginservice.getdecoded();

  }

  ngAfterViewInit(){
    //this.more must be called here since QRcode will dynamically create DOM, not sure why this.token here???? 
    this.token = this.loginservice.gettoken();
    this.decoded = this.jwtHelper.decodeToken(this.token);
    this.more();
  }

  more(){
    var canvas = document.getElementById("qrcode");
    var qrcode = new QRCode(canvas, {
    text: this.token,
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
    });

    var ctx = canvas.firstChild.getContext('2d');

    var img = new Image();
    img.src = this.decoded.logo;
    img.onload = function(){
      ctx.drawImage(img,100,100,50,50);
    }
   
  }
  
}
