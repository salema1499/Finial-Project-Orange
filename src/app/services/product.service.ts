import { Injectable } from '@angular/core';
import Product from '../models/product.interface';
import storageKeys from '../shared/storageKeys';
import APIService from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: APIService) {}

  listProducts() {
    let url = '/product';
    return this.apiService.get(url);
  }

  addProdut(product: Product) {
    let url = '/product/add';
    let { title, address, country, coverImg, price, type } = product;
    return this.apiService.post(url, {
      title,
      address,
      country,
      coverImg,
      price,
      type,
    });
  }

  deleteProduct(id: string) {
    let url = '/product';
    let token = localStorage.getItem(storageKeys.aqarToken);
    return this.apiService.delete(url, token, {
      id,
    });
  }

  buyProduct(productID: string) {
    let url = '/product/buy';
    let userData = localStorage.getItem(storageKeys.userData);
    let userJson: { _id: string } = userData
      ? JSON.parse(userData)
      : { _id: '' };
    return this.apiService.post(url, {
      userID: userJson?._id,
      productID,
    });
  }

  freeProduct(productID: string) {
    let url = '/product/free';
    return this.apiService.post(
      url,
      {
        productID,
      },
      true
    );
  }

  getProductDetails(productID: string) {
    let url = `/product/${productID}`;
    return this.apiService.get(url);
  }
}
