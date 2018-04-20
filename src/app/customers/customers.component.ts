import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from '../models/customer';
import { AppError } from '../common/app-error';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  subscription: Subscription;

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.subscription = this.customerService.getCustomers().subscribe(
      (customers: Customer[]) => {
       console.log(customers);
        this.customers = customers;
      },
      (error: AppError) => {
        console.log(error.message, error);
      }
    );
  }

  onDelete(customerId) {
    if (confirm('Are you sure?')) {
      this.customerService.deleteCustomer(customerId).subscribe(
        () => {
          console.log(`Success: Delete customer successful. (id: ${customerId})`);
          this.customers = this.customers.filter(
            customer => customer.id !== customerId
          );
        },
        (error: AppError) => {
          console.log(error.message, error);
        }
      );
    }
  }

}
