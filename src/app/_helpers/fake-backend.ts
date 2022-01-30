import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { User } from "../_models";
import { Product } from "../_models/product";
import { ProductComponent } from "../product/product.component";

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem("users") ?? "[]") || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate();
        case url.endsWith("/users/register") && method === "POST":
          return register();
        case url.endsWith("/users") && method === "GET":
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === "DELETE":
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    //        id: number;
    //   email: string;
    //   password: string;
    //   name: string;
    //   token: string;
    //  walletItems:Object[];
    //  walletBalance:number;
    // activeBids:Object[];
    // engagedWalletBalance:number;

    function authenticate() {
      const { email, password } = body;
      const user = users.find(
        (x: User) => x.email === email && x.password === password
      );
      if (!user) return error("Email or password is incorrect");
      return ok({
        id: user.id,
        email: user.email,
        name: user.name,
        walletItems: user.walletItems,
        walletBalance: user.walletBalance,
        activeBids: user.activeBids,
        engagedWalletBalance: user.engagedWalletBalance,
        token: "fake-jwt-token",
      });
    }

    function register() {
      const user = body;

      if (users.find((x: User) => x.email === user.email)) {
        return error('Username "' + user.email + '" is already taken');
      }

      user.id = users.length
        ? Math.max(...users.map((x: User) => x.id)) + 1
        : 1;
      user.walletBalance = 0;
      user.walletItems = [];
      user.activeBids = [];
      user.engagedWalletBalance = 0;
      users.push(user);

      localStorage.setItem("users", JSON.stringify(users));

      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter((x: User) => x.id !== idFromUrl());
      localStorage.setItem("users", JSON.stringify(users));
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: any) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
