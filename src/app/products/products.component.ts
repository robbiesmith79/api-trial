import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { Product } from '../services/product';
import { Category } from '../services/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.listProducts();
  }

  public products: any[] = new Array<Product>();
  public categories: any[] = new Array<Category>();
  isModalVisible = false;

  listProducts() {
    this.api.get("Products").subscribe(
      products => {
        this.products = products;
      }, err => {
        console.log("ERROR: ", err);
      }
    );
  }
 
  listCategories() {
    this.api.get("Categories").subscribe(
      categories => {
        this.categories = categories;
      }, err => {
        console.log("ERROR: ", err);
      }
    );
  }

  deleteOrder() {
    console.log("Delete order");
  }

}
