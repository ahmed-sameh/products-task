import { Component, Input, OnInit } from '@angular/core';
import { PRODUCT } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productDetails!: PRODUCT;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  // function simulate to add product to cart in local storage
  addToCart(productId: number) {
    this.cartService.addProductToCart(productId);
    this.cartService.onAddToCart.next(productId);
  }
}
