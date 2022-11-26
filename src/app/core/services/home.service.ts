import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  onProductSearch = new Subject<string>();
  constructor(private apiService: ApiService) {}

  getAllProducts() {
    return this.apiService.get('products');
  }

  getProductsByKeyword(keyword: string) {
    return this.apiService.get(`products/search?q=${keyword}`);
  }

  getProductsByCategory(categoryName: string) {
    return this.apiService.get(`products/category/${categoryName}`);
  }

  getAllCategories() {
    return this.apiService.get('products/categories');
  }
}
