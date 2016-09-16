import {Employee} from './employee';
import {Injectable} from 'angular2/core';

@Injectable()
export class EmployeeService {

  constructor(){
    this.employees = [];
  }

  findAll() {
      var employee_1 = new Employee("1","WEN","shuwen","","li","+6555","+6566","+6577","hcl","R&D","Dev","https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg");
      var employee_2 = new Employee("2","SHAN","shan","","guo","55","66","77","ABB","SCM","Sup","https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg");
      this.employees.push(employee_1);
      this.employees.push(employee_2);
      
      return this.employees;
  }

  add(employee){
      //save it to disk, the format should be 3;Dan;Daniel;HOO;Liu;555;666;777;ABB;SCM;VP;https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg
  }

  findByName(name) {
      return new Promise((resolve, reject) => 
        {
          var filtered = this.employees.filter(employee => (employee.given + ' ' + employee.family).toLowerCase().indexOf(name.toLowerCase()) > -1);
          resolve(filtered);
        });
  }

  findById(id) {
       return new Promise((resolve, reject) => 
       {
          resolve(employees[id-1]);
       });
  }

}
