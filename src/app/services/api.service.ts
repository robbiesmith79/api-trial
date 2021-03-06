import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { appApiResources } from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Complete header package that must be sent as anothorization into the Swagger API
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + appApiResources.JWT);

  constructor(private http: HttpClient ) { }

  // for generic requests
  get(route: string): Observable<any> {
    return this.http.get(appApiResources.API_ENDPOINT + route,{headers: this.headers});
  }

  /* grab the individual product and return an observable */
  getProduct(productId: number): Observable<any> {
    return this.http.get(appApiResources.API_ENDPOINT + 'Products/' + productId,{headers: this.headers});
  }

  /* this data is coming in as an object with two properties:
    product: Name, Description, Url
    category: Array<Category>[] of selected categories from the new form process
  */
  post(route: string, data: any) {
    var packagedData = {"Name":"","Description":"","Url":"","CategoryIds":[]};
    packagedData.CategoryIds = data.categories;
    packagedData.Url = data.product.Url;
    packagedData.Description = data.product.Description;
    packagedData.Name = data.product.Name;
    return this.http.post(appApiResources.API_ENDPOINT + "" + route,packagedData,{headers: this.headers}) // ...using post request
      .pipe(
        catchError(this.handleError)
      ).subscribe(); // the post back from the api will not return the categoryids, just the basic product information like name, desc, url
  }

  /* put request to the swagger api. build the data model and attach the headers */
  put(route: string, data: any) {
    var packagedData = {"Name":"","Description":"","Url":"","CategoryIds":[]};
    packagedData.CategoryIds = data.categories;
    packagedData.Url = data.product.Url;
    packagedData.Description = data.product.Description;
    packagedData.Name = data.product.Name;
    return this.http.put(appApiResources.API_ENDPOINT + "" + route + "/" + data.productId,packagedData,{headers: this.headers}) // ...using post request
      .pipe(
        catchError(this.handleError)
      ).subscribe(); // the post back from the api will not return the categoryids, just the basic product information like name, desc, url 
  }

  /* more robust error reporting */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
