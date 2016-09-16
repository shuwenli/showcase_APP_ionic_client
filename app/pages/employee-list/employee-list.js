import {Page, Platform,NavController,NavParams} from 'ionic-angular';
import {NgZone,OnInit} from "angular2/core";
import {EmployeeDetailsPage} from '../employee-details/employee-details';
import {EmployeeService} from '../services/employee_service';
import {LoginService} from '../services/login_service';
import {Employee} from '../services/employee';
import {JwtHelper} from 'angular2-jwt';

@Page({
    templateUrl: 'build/pages/employee-list/employee-list.html',
})

export class EmployeeListPage {

    static get parameters() {
        return [ [Platform],[NavController],[NavParams],[EmployeeService],[NgZone],[LoginService]];
    }

    constructor(platform,nav,navParams,employeeservice,ngzone,loginservice) {
        this.platform = platform;
        this.nav = nav;
        this.selectedItem = navParams.get('item');
        this.query = '';
        this.employeeservice = employeeservice;
        this.ngzone = ngzone;
        this.loginservice = loginservice;
        //this.employees = this.employeeservice.findAll();
        this.jwtHelper = new JwtHelper();
 
    }

    ngOnInit() {
        this.employees = this.employeeservice.findAll();
    }

    ngAfterViewInit(){
        this.token = this.loginservice.gettoken();
        this.decoded = this.jwtHelper.decodeToken(this.token);
        this.client_id = this.decoded.id.toString();
        //this.client = new Paho.MQTT.Client('192.168.0.159', Number(3000), this.client_id);
        //this.init_mqtt();
    }


    init_mqtt(){

      var _this = this;
      this.client.onConnectionLost = onConnectionLost;
      this.client.onMessageArrived = onMessageArrived;
      this.client.connect({onSuccess:onConnect});

      function onConnect() {
        console.log("onConnect");
        _this.client.subscribe("/Contacts/" + _this.client_id);
      }

      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
        }
      }
      function onMessageArrived(message) {
        var peer_token = message.payloadString;
        alert("in on messagearrive"+peer_token);
        var peer_decoded = _this.jwtHelper.decodeToken(peer_token);
        alert(JSON.stringify(peer_decoded));
        _this.addto_device(peer_decoded);
      }

    }

    addto_device(decoded){
          alert("add to device"+JSON.stringify(decoded));
          function onSuccess(contact) { alert("Save Success");};
          function onError(contactError) { alert("Error = " + contactError.code);};

          var new_contact = new Employee(decoded.id,decoded.username,decoded.given,decoded.middle,decoded.family,decoded.work,decoded.mobile,decoded.home,decoded.org,decoded.dep,decoded.title,decoded.pic);

          this.ngzone.run(() => {
           this.employees.push(new_contact);
          });
          this.employeeservice.add(decoded); // need to update add method for sql storage
          
          var contact = navigator.contacts.create();
 //         contact.displayName = decoded.username;
  //        contact.nickname = decoded.username;
          var name = new ContactName();
          name.givenName = decoded.given;
//          name.middleName = decoded.middle;
          name.familyName = decoded.family;
          contact.name = name;
          var phoneNumbers = [];
          phoneNumbers[0] = new ContactField('work', decoded.work, false);
          phoneNumbers[1] = new ContactField('mobile', decoded.mobile, true);
          phoneNumbers[2] = new ContactField('home', decoded.home, false);
          contact.phoneNumbers = phoneNumbers;
//        contact.organizations = [ new ContactOrganization(true, 'work', decoded.org, decoded.dep, decoded.title)];
          contact.organizations = [ new ContactOrganization(true, 'work', decoded.org, '', '')];
          contact.save(onSuccess, onError);

        };
    
    sendto_mqtt(peer_id){
        alert("in sendto_mqtt"+this.token);

        var message = new Paho.MQTT.Message(this.token);
        message.destinationName = "/Contacts/" + peer_id;
        this.client.send(message);
    }

    scan() {
        var _this = this; //_this is for  save this to be used in inner function(result);

        this.platform.ready().then(() => {
          cordova.plugins.barcodeScanner.scan(
            function (result) {
                var peer_token = result.text;
                alert("scan"+peer_token);
                var peer_decoded = _this.jwtHelper.decodeToken(peer_token);
                var peer_id = peer_decoded.id.toString();
                _this.addto_device(peer_decoded);
           //     _this.sendto_mqtt(peer_id);
            },
            function (error) {
              alert("Scanning failed: " + error);
            }
          );
        });
    }


    search(event) {
        // set q to the value of the searchbar
        var q = event.value;

        // if the value is an empty string don't filter the items
        if (q.trim() == '') {
          return;
        }

//        this.employees = [ this.employees[0],this.employees[0]];
        /*this.employees = this.employees.filter((v) => {
          if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        })*/
    }

    itemTapped(event,employee) {
        this.nav.push(EmployeeDetailsPage, {
            employee: employee
        });
    }
}
