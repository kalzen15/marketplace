import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User|null>;

    constructor(private http: HttpClient) {
        var val:any= JSON.parse(localStorage.getItem('currentUser')??"{}")
        this.currentUserSubject = new BehaviorSubject<User|null>(Object.keys(val).length===0?null:val);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User|null {
        return this.currentUserSubject.value;
    }

    login(email:string, password:string) {
       console.log(email+password);
        return this.http.post<any>(`http://localhost:4000/users/authenticate`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
