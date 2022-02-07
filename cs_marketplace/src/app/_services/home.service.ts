import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
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

  getTop() {
    return this.http.get(`http://localhost:9000/api/top`, this.httpOptions);
  }
  getLatest() {
    return this.http.get(`http://localhost:9000/api/latest`, this.httpOptions);
  }
}
