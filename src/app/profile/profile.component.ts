import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../_models";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  currentUser: User | null;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {}
}
