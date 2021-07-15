import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Product} from "./product";
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/products';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getProducts() : Observable<Product[]> {

    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<Product> {
    console.log(id);
    return this.httpClient.get<Product>(this.baseUrl+'/'+ id);
  }

  createProduct(product: Product): Observable<Product> {
    console.log('create');
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.baseUrl+'/'+ product.id, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(this.baseUrl+'/'+ id);
  }
}