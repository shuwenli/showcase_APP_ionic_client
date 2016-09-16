import {Employee} from './employee';
import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class LoginService {

  constructor(){
    this.local = new Storage(LocalStorage);

    this.local.get('id_token').then(token => {
      this.token = token;
      alert("in loginservice" + this.token);
    }).catch(error => {
      console.log(error);
    });
  }

  gettoken(){
    return this.token;
  }
 
  getdecoded(){
    return this.decoded;
  }

  getlogin_string(){
  }

  update(employee){
      //save it to disk, the format should be 3;Dan;Daniel;HOO;Liu;555;666;777;ABB;SCM;VP;https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg
  }

}
