import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomersService } from '../services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer:Customer;
  customer_id:number;
  constructor(private customerService:CustomersService,private route: ActivatedRoute,private router: Router)
  { 
    this.customer=new Customer();
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap(params => {
        this.customer_id = +params.get('id');
        return this.customerService.getCustomer(this.customer_id);
      })
      .subscribe(
        (customer: Customer) => {
          this.customer = customer;
        },
        error => {
          console.log(`Error: Get customer failed! (id: ${this.customer_id})`, error);
        }
      );
  }

  onDelete(){
    if (confirm('Are you sure?')) {
      this.customerService.deleteCustomer(this.customer_id).subscribe(
        () => {
          
          this.router.navigate(['/customers']);
        },
        error => {
          console.log(`Error: Delete `);
        }
      );
    }
  }
  }
}
