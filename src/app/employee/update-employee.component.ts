import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-employee-update',
  templateUrl: './update-employee.component.html',
})
export class UpdateEmployeeComponent implements OnInit {

  employee: any = {};
  currentEmployeeId:any;

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) {
    
  }

  ngOnInit() {
    this.employeeService.getEmployee(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.employee = data.data;
        this.currentEmployeeId = this.route.snapshot.params['id'];
      }, (error) => {                            
        this.handleError(error);
      });
  };

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(data => {
        alert("Employee updated successfully.");
        this.router.navigate(['/employees']);
      }, (error) => {                            
        this.handleError(error);
      });

  };

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}