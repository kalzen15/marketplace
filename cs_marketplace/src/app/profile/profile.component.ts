import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: User | null;
  modal = false;
  @ViewChild('moneyAmount') moneyAmountRef: ElementRef;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.updateUser();
  }
  updateUser() {
    this.userService.getUser(this.currentUser?._id ?? '').subscribe((data) => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUser = JSON.parse(JSON.stringify(data));
      console.log('data', data);
    });
  }

  onAddMoney() {
    this.userService
      .addMoney(
        this.moneyAmountRef.nativeElement.value,
        this.currentUser?._id ?? ''
      )
      .subscribe((data) => {
        this.modal = false;
        this.updateUser();
      });
  }
}
