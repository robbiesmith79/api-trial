import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { Category } from '../services/dataModels';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.listCategories();
  }

  public categories: any[] = new Array<Category>();

  // get all categories from the API
  listCategories() {
    this.api.get("Categories").subscribe(
      categories => {
        this.categories = categories;
      }, err => {
        console.log("ERROR: ", err);
      }
    );
  }

}
