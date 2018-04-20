import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  id: number;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap(params => {
        this.id = +params.get('id');
        return this.service.getProduct(this.id);
      })
      .subscribe(
        (product: Product) => {
          console.log(`Success: Get product successful. (id: ${this.id})`);
          this.product = product;
        },
        error => {
          console.log(`Error: Get product failed! (id: ${this.id})`, error);
        }
      );
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.service.deleteProduct(this.id).subscribe(
        () => {
          console.log(`Success: Delete product successful. (id: ${this.id})`);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(`Error: Delete product failed. (id: ${this.id})`);
        }
      );
    }
  }
}
