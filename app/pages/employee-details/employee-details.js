import {Page, NavController, NavParams} from 'ionic-angular';
import {Employee} from '../services/employee';

@Page({
    templateUrl: 'build/pages/employee-details/employee-details.html'
})

export class EmployeeDetailsPage {
    static get parameters() {
        return [[NavController],[NavParams]];
    }

    constructor(nav, navParams) {
        this.nav = nav;
        // If we navigated to this page, we will have an item available as a nav param
        this.employee = navParams.get('employee');
        //this.qrcode();
    }
 
    ngAfterViewInit(){
     // this.qrcode(); //only call qrcode in ngAfterViewInit can work for DOM, see Lift Cycle about Component
    }

   qrcode(){
      alert("in qrcode");
      var canvas = document.getElementById("qrcode_employee");
      alert(canvas.nodeName);
      var qrcode = new QRCode(canvas, {
      text: "1;WEN;shuwen;;li;+6555;+6566;+6577;hcl;R&D;Dev;https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg",
      width: 256,
      height: 256,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
      });

      var ctx = canvas.firstChild.getContext('2d');

      var img = new Image();
      img.src = "http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/112012/abb_0.png?itok=N28Nhe9";
      img.onload = function(){
        ctx.drawImage(img,100,100,50,50);
      }
   }

}
