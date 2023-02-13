import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Product from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  callingApi = true;
  buying = false;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    const { id } = this.route.snapshot.params;
    this.productService.getProductDetails(id).subscribe(
      (data: any) => {
        this.product = data?.data;
        this.callingApi = false;
      },
      (err) => {
        if (err?.error?.message) {
          alert(err?.error?.message);
        }
        this.callingApi = false;
      }
    );
  }

  buyProd() {
    this.buying = true;
    if (this.product?._id && this.product?.status) {
      this.productService.buyProduct(this.product?._id).subscribe(
        (res) => {
          alert('you bought product successfully');
          this.buying = false;
          if (this.product) this.product.status = 'sold';
        },
        (err) => {
          if (err && err.error?.message) {
            alert(err.error?.message);
          } else {
            alert("can't buy product now");
          }
          this.buying = false;
        }
      );
    }
  }
}
