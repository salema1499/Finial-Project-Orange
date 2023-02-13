import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Product from 'src/app/models/product.interface';
import AuthService from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  isAdmin = false;
  @Input('data') data: Product | undefined;
  @Input() callingApi = false;
  @Output('onDelete') onDelete = new EventEmitter();
  @Output('onBuy') onBuy = new EventEmitter();
  @Output('onFree') onFree = new EventEmitter();

  constructor(
    private authService: AuthService,
    private prodService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  deleteProd() {
    this.callingApi = true;
    this.onDelete.emit(this.data?._id);
  }

  buyProd() {
    this.callingApi = true;
    if (this.data?._id && this.data?.status) {
      this.prodService.buyProduct(this.data?._id).subscribe(
        (res) => {
          alert('you bought product successfully');
          this.callingApi = false;
          if (this.data) this.data.status = 'sold';
        },
        (err) => {
          if (err && err.error?.message) {
            alert(err.error?.message);
          } else {
            alert("can't buy product now");
          }
          this.callingApi = false;
        }
      );
    }
  }

  freeProduct() {
    this.callingApi = true;
    if (this.data?._id && this.data?.status) {
      this.prodService.freeProduct(this.data?._id).subscribe(
        (res) => {
          alert('you freed product successfully');
          this.callingApi = false;
          if (this.data) this.data.status = 'Available';
        },
        (err) => {
          if (err && err.error?.message) {
            alert(err.error?.message);
          } else {
            alert("can't free product now");
          }
          this.callingApi = false;
        }
      );
    }
  }

  gotoProductDetails() {
    this.router.navigate(['home/productdetails', this.data?._id]);
  }
}
