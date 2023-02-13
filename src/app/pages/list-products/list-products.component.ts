import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  callingApi = true;
  deleting = false;
  buying = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.listProducts().subscribe(
      (res: any) => {
        console.log('prod res: ', res);
        this.products = res || [];
        this.callingApi = false;
      },
      (err) => {
        if (err) {
          let msg = err.error?.message;
          if (msg) {
            alert(msg);
          } else {
            alert('something went wrong');
          }
        }
        this.callingApi = false;
      }
    );
  }

  deleteProduct(id: string) {
    this.deleting = true;
    this.productService.deleteProduct(id).subscribe(
      (res) => {
        this.products = this.products.filter((p) => p._id !== id);
        this.deleting = false;
      },
      (err) => {
        if (err && err.error?.message) {
          alert(err.error?.message);
        } else {
          alert("can't delete product now");
        }
        this.deleting = false;
      }
    );
  }

  buyProduct(id: string) {
    this.buying = true;
    this.productService.buyProduct(id).subscribe(
      (res) => {
        alert('you buy product successfully');
        this.buying = false;
      },
      (err) => {
        if (err && err.error?.message) {
          alert(err.error?.message);
        } else {
          alert("can't delete product now");
        }
        this.buying = false;
      }
    );
  }

  freeProduct(id: string) {
    this.buying = true;
    this.productService.freeProduct(id).subscribe(
      (res) => {
        alert('you freed product successfully');
        this.buying = false;
        this.products = this.products.map((p) => {
          if (p._id === id) {
            p.status = 'Available';
          }
          return p;
        });
      },
      (err) => {
        if (err && err.error?.message) {
          alert(err.error?.message);
        } else {
          alert("can't delete product now");
        }
        this.buying = false;
      }
    );
  }
}
