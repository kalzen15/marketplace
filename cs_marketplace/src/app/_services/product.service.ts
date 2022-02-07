import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpOptions;

  constructor(private http: HttpClient) {
    var token = localStorage.getItem('token') ?? '""';
    token = token.slice(1, token.length - 1);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        token,
      }),
    };
  }

  getProduct(id: string) {
    return this.http.get(
      `http://localhost:9000/api/product/${id}`,
      this.httpOptions
    );
  }

  placeBid(productId: string, data: any, product: any) {
    return this.http.post(
      `http://localhost:9000/api/buy`,
      { data, productId, product },
      this.httpOptions
    );
  }
  endSale(productId: string, buyer: any, product: any, seller: any, bid: any) {
    return this.http.post(
      `http://localhost:9000/api/endSale`,
      { buyer, productId, product, seller, bid },
      this.httpOptions
    );
  }
}
