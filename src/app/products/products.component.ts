import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { Category, Product, CurrentProduct } from '../services/dataModels';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService) {
    let categoryIds: number[];
    let productCategoryIds: number[];
  }

  ngOnInit() {
    this.listProducts();
    this.listCategories(); // better as an onLoad modal launch
  }

  // variable declarations
  public products: any[] = new Array<Product>();
  public categories: any[] = new Array<Category>();
  public currentCategories: any[] = new Array<Category>();
  categoryIds = new Array;
  productCategoryIds = new Array;
  public selectedCategories: any[] = new Array<Category>();
  isViewModalVisible = false;
  isModalVisible = false;
  isEditModalVisible = false;
  public currentProd: CurrentProduct = new CurrentProduct();
  public product: Product = new Product();
  public submitted: boolean = false;

  // retrieve a list of all products
  listProducts() {
    this.api.get("Products").subscribe(
      products => {
        this.products = products;
      }, err => {
        console.log("ERROR: ", err);
      }
    );
  }
 
  // retreive a list of categories
  listCategories() {
    this.api.get("Categories").subscribe(
      categories => {
        this.categories = categories;
        // isolate just the categoryIds
        this.categories.forEach((element,i) => {
          this.categories[i].checked = false;
          this.categoryIds.push(element.CategoryId);
        });
      }, err => {
        console.log("ERROR: ", err);
      }
    );
  }

  //reset the checked status of all categories
  resetCheckedStatus(choice: boolean) {
    this.categories.forEach((element,i) => {
      this.categories[i].checked = choice;
    });
    return this.categories;
  }

  // collect the product info to view.
  onView(product) {
    this.api.getProduct(product.ProductId).subscribe(
      resp => {
        this.currentProd = resp;
        this.isViewModalVisible = true;
      }, err => {
        console.log("ERROR: ", err);
      }
    )
  }

  // load the data for the edit modal
  onEdit(product) {
    // reset the known current category ids
    this.productCategoryIds = [];

    // get the details of the requested product
    this.api.getProduct(product.ProductId).subscribe(
      resp => {
        this.currentProd = resp;

        //isolate just the current product CateogoryIds
        this.currentProd.Categories.forEach(element => {
          this.productCategoryIds.push(element.CategoryId);
        });
        
        //go through and check pre-existing categories for the view to render
        this.categories.forEach((element,i) => {
          this.categories[i].checked = false;
          if (this.productCategoryIds.indexOf(element.CategoryId)>-1) {
            this.categories[i].checked = true;
          } 
        });
        this.isEditModalVisible = true;
      }, err => {
        console.log("ERROR: ", err);
      }
    );
  }

  //we're in the conext of this.currentProduct
  updateProduct() {
    this.submitted = true;
    this.selectedCategories = [];
    this.categories.forEach((element,i) => {
      if (element.checked === true) {
        this.selectedCategories.push(element.CategoryId);
      }
    });
    this.api.put("Products",{productId: this.currentProd.ProductId, product: this.currentProd, categories: this.selectedCategories});
  }

  // not implemented for this demo because the API doesn't allow it; this is just a placeholder
  onDelete(product) { }

  /* Send a new product to the API with the product information just collected along with the list of selected categories */
  addProduct() {
    this.submitted = true;
    this.selectedCategories = [];
    this.categories.forEach((element,i) => {
      if (element.checked === true) {
        this.selectedCategories.push(element.CategoryId);
      }
    })
    this.api.post("Products",{product: this.product, categories: this.selectedCategories});
  }

  //close out the add / edit process
  resetForm() {
    console.log("resetting form");
    this.submitted = false;
    // reset categories checked status
    this.categories = this.resetCheckedStatus(false);
    this.listProducts();
  }
}