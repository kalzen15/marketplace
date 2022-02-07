import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  httpOptions: any;
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

  createProduct(data: {
    name: string;
    description: string;
    asset: string;
    endTimeStamp: string;
    userId: string;
  }) {
    return this.http.post(`http://localhost:9000/api/`, data, this.httpOptions);
  }
}
