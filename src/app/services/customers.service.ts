import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { Product } from '../models/product';
import { AppError } from '../common/app-error';
import { Customer } from '../models/customer';
@Injectable()
export class CustomersService {
  private apiUrl = 'http://localhost:3000/customers';

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
   return this.httpClient.get<Customer[]>(this.apiUrl);
 }

  getCustomer(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.apiUrl}/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient
      .post<Customer>(this.apiUrl, customer);
  }
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.httpClient.patch<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
 }
}
