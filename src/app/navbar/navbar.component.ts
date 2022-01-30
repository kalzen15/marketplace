import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   profileMenu=false;
   currentUser:User|null;

  constructor( private router: Router,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

        }

  ngOnInit(): void {
  }
  logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
