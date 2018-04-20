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

@Injectable()
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // const myParams = new HttpParams().set('name', 'naveen');
    // const myHeaders = new HttpHeaders().set('my-auth', 'abc');
    const options = {
      observe: 'body',
      responseType: 'json'
      // params: myParams
      // headers: myHeaders
    };
    return (
      this.httpClient
        .get(this.apiUrl)
        // .map((response: HttpResponse) => {
        //   console.log('response:', response);
        //   return response.body;
        // })
        .catch(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(`${this.apiUrl}/${id}`)
      .catch(this.handleError);
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient
      .post<Product>(this.apiUrl, product)
      .catch(this.handleError);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient
      .patch<Product>(`${this.apiUrl}/${id}`, product)
      .catch(this.handleError);
  }

  deleteProduct(id: number) {
    return this.httpClient
      .delete(`${this.apiUrl}/${id}`)
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(new AppError(error));
  }
}
