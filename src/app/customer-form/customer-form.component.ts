import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customer_id: number;
  customer:Customer;
  addNewCustomer: boolean;
  @ViewChild('f') customerForm: NgForm;
  constructor(private route: ActivatedRoute,private router: Router,private customerService: CustomersService)
  {
    this.customer=new Customer();
    this.addNewCustomer = true;
  }

  ngOnInit() {

    this.route.paramMap
      .switchMap(params => {
        if (!params.get('id') || params.get('id') === 'new') {
          return Observable.empty();
        }

        this.customer_id = +params.get('id');
        return this.customerService.getCustomer(this.customer_id);
      })
      .subscribe(
        (customer: Customer) => {
        
          this.customer = customer;
          this.addNewCustomer = false;
        },
        error => {
          console.log(`Error: Get customer failed! (id: ${this.customer_id})`, error);
        }
      );
  }

  onSave(){
    this.customer.name = this.customerForm.value.name;
    this.customer.email = this.customerForm.value.email;
    this.customer.phone = +this.customerForm.value.phone;
    this.customer.city = this.customerForm.value.city;

    if (this.addNewCustomer) {
      this.customerService.addCustomer(this.customer).subscribe(
        customer => {
         // console.log('Success: Add product successful. product:', product);
          this.router.navigate(['/customers']);
        },
        error => {
          console.log('Error: Add customer failed.');
        }
      );
    } else {
      this.customerService.updateCustomer(this.customer_id, this.customer).subscribe(
        customer => {
          console.log('Success: Update customer successful. product:', customer);
          this.router.navigate(['/customers']);
        },
        error => {
          console.log(`Error: Update customer failed. (id: ${this.customer_id})`);
        }
      );
    }

  }

}
