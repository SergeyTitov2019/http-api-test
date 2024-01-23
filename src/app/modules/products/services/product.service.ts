// @ts-ignore
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ProductInterface} from "../interfeses/product.interface";
import { Observable} from "rxjs";

// @ts-ignore
@Injectable({
  providedIn: "root"
})

export class ProductService {

  private baseUrl: string = 'http://localhost:3000/products';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private readonly httpClient: HttpClient) { }

  getProducts() : Observable<ProductInterface[]> {
    return this.httpClient.get<ProductInterface[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<ProductInterface> {
    console.log('id:', id);
    return this.httpClient.get<ProductInterface>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: ProductInterface): Observable<ProductInterface> {
    console.log('create product:', product);
    return this.httpClient.post<ProductInterface>(this.baseUrl, product);
  }

  updateProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.httpClient.put<ProductInterface>(`${this.baseUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<ProductInterface> {
    return this.httpClient.delete<ProductInterface>(`${this.baseUrl}/${id}`);
  }
}
