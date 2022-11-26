import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PRODUCT } from 'src/app/core/models/product.model';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'All Products';
  catgeroyName = '';
  products: PRODUCT[] = [];
  categories = [];
  catgeoryForm: FormGroup = new FormGroup({
    category: new FormControl(),
  });
  p = 1;
  searchSub!: Subscription;
  constructor(private homeService: HomeService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.pageTitle = 'All Products';
    this.catgeroyName = '';

    this.getAllProducts();
    this.getAllCatgeories();
    this.searchSub = this.homeService.onProductSearch.subscribe((keyword) =>
      this.onProductsSearch(keyword)
    );
  }

  // function to  get All Products
  getAllProducts() {
    this.homeService.getAllProducts().subscribe((res) => {
      this.products = res.products;
    });
  }

  // function to get all categories
  getAllCatgeories() {
    this.homeService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  // function to get Products based on specific category
  onFilterChange() {
    this.homeService
      .getProductsByCategory(this.catgeoryForm.value.category)
      .subscribe((res) => {
        this.pageTitle = this.catgeoryForm.value.category;
        this.catgeroyName = this.catgeoryForm.value.category;

        this.products = res.products;
      });
  }

  // function top get products pased on search keywaord
  onProductsSearch(keyword: string) {
    this.homeService.getProductsByKeyword(keyword).subscribe((res) => {
      this.pageTitle = `Search Result Of ${keyword}`;
      this.products = res.products;
    });
    this.catgeoryForm.reset();
    this.catgeroyName = '';
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
