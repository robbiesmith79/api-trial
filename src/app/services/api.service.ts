import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, Response } from "@angular/http";
import { Observable } from 'rxjs';
import { Category } from "./category";
import { map } from "rxjs/operators";
import { appApiResources } from "../app.constants";
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = appApiResources.JWT;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + appApiResources.JWT);

  constructor(private http: HttpClient ) { }

  // 
  private endpoint: string = appApiResources.API_ENDPOINT;

  private httpOptions: any;
 
  // the actual JWT token
  public token: string = TOKEN_NAME;
 
  // the token expiration boolean
  public token_expires: boolean = this.isTokenExpired();
 
  // error messages received from the login attempt
  public errors: any = [];

  public categories: Category[];

  getCategories(): Observable<any> {
    //console.log(this.headers);
    return this.http.get(this.endpoint+'Categories',{headers: this.headers});
  }

  get(route: string): Observable<any> {
    return this.http.get(this.endpoint + '/' + route,{headers: this.headers});
  }

  put(route: string, data: any) {
    //this.http.post(this.endpoint + '/' + route,{data => this.data},{headers: this.headers});
  }

  update () {

  }

  delete () {

  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
