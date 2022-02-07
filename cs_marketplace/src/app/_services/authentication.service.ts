import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      observe: 'response',
    }),
  };

  constructor(private http: HttpClient) {
    var val: any = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      Object.keys(val).length === 0 ? null : val
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(
        `http://localhost:9000/users/login`,
        {
          email,
          password,
        },
        this.httpOptions
      )
      .pipe(
        map((resp) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(resp.user));
          localStorage.setItem('token', JSON.stringify(resp.token));
          this.currentUserSubject.next(resp.user);
          return resp;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
