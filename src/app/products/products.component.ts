import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.subscription = this.service.getProducts().subscribe(
      (products: Product[]) => {
        console.log('Success: Get products successful.');
        this.products = products;
      },
      (error: AppError) => {
        console.log(error.message, error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(productId) {
    if (confirm('Are you sure?')) {
      this.service.deleteProduct(productId).subscribe(
        () => {
          console.log(`Success: Delete product successful. (id: ${productId})`);
          this.products = this.products.filter(
            product => product.id !== productId
          );
        },
        (error: AppError) => {
          console.log(error.message, error);
        }
      );
    }
  }
}
