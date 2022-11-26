import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  onAddToCart = new Subject<number>();
  constructor() {}

  addProductToCart(productId: number) {
    const products = this.getProductsFromCart();
    const newCollection = { products: [...products, productId] };
    localStorage.setItem('cart', JSON.stringify(newCollection));
  }

  getProductsFromCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')!).products
      : [];
  }
}
