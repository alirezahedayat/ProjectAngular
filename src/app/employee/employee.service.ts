import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class EmployeeService {

  constructor(private http:HttpClient) {}

  private employeeUrl = 'http://dummy.restapiexample.com/api/v1';

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.employeeUrl + "/employees")
}
 
  getEmployee(id): Observable<any> {
    return this.http.get<any>(this.employeeUrl + "/employee/"+ id);
}

   deleteEmployee(employee): Observable<any> {
    return this.http.delete(this.employeeUrl + "/delete/"+ employee.id);
  }
 
  createEmployee(employee):Observable<any> {
    return this.http.post(this.employeeUrl + "/create",JSON.stringify(employee) );
  }

  public updateEmployee(employee):Observable<any> {
    return this.http.put(this.employeeUrl + "/update/"+ employee.id,JSON.stringify(employee)) 
  }

}
