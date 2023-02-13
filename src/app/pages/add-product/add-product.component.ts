import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Product from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  callingApi = false;
  title: string = '';
  address: string = '';
  coverImg: string = '';
  country: string = '';
  type: string = '';
  price: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  submit() {
    this.callingApi = true;
    let product: Product = {
      address: this.address,
      country: this.country,
      title: this.title,
      coverImg: this.coverImg,
      price: this.price,
      type: this.type,
    };
    this.productService.addProdut(product).subscribe(
      (data) => {
        this.callingApi = false;
        alert('Product added successfully');
        this.clearForm();
        this.router.navigateByUrl('/home/products');
      },
      (err) => {
        if (err && err?.error?.message) {
          alert(err?.error?.message);
        } else {
          alert("Can't add product now");
        }
        this.callingApi = false;
      }
    );
  }

  clearForm() {
    this.address = '';
    this.title = '';
    this.country = '';
    this.coverImg = '';
    this.type = '';
    this.price = 0;
  }
}
