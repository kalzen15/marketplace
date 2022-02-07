import { Injectable } from '@angular/core';
import { User } from '../_models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  httpOptions: any;

  getAll() {
    return this.http.get<User[]>(`http://localhost:4200/user`);
  }

  getUser(id: string) {
    return this.http.get(
      `http://localhost:9000/api/currentUser/${id}`,
      this.httpOptions
    );
  }

  addMoney(amount: number, userId: string) {
    return this.http.post(
      `http://localhost:9000/api/addMoney`,
      { userId, amount },
      this.httpOptions
    );
  }

  register(user: User) {
    return this.http.post(
      `http://localhost:9000/users/register`,
      user,
      this.httpOptions
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:4200/users/${id}`);
  }
}
