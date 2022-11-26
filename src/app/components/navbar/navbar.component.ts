import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  productCounts = 0;
  showAccountList = false;
  isUserAuthenticated = false;
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl(),
  });
  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.UIHandler();
    this.getProductsCounts();
  }

  onLogout() {
    this.authService.logout();
  }

  // function to handle the ui based on user authentication
  UIHandler() {
    this.authService.userAuthenticated.subscribe((isAuth) => {
      this.isUserAuthenticated = isAuth ? true : false;
    });
    this.isUserAuthenticated = this.authService.isUserAuthenticated()
      ? true
      : false;
  }

  // function to get products counts and subscripe to any change in products in the cart
  getProductsCounts() {
    this.productCounts = this.cartService.getProductsFromCart().length;

    this.cartService.onAddToCart.subscribe((res) => {
      this.productCounts = this.cartService.getProductsFromCart().length;
    });
  }

  // method responsble about products search
  onSearch() {
    if (
      this.searchForm.value.keyword &&
      (this.searchForm.value.keyword as string).length > 0
    ) {
      this.homeService.onProductSearch.next(this.searchForm.value.keyword);
      this.searchForm.reset();
    }
  }
}
