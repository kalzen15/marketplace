import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models';
import { AuthenticationService } from '../_services/authentication.service';
import { NavbarService } from '../_services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profileMenu = false;
  currentUser: User | null;
  modal = false;
  @ViewChild('desc', { static: false }) descRef: ElementRef;
  @ViewChild('asset', { static: false }) assetRef: ElementRef;
  @ViewChild('name', { static: false }) nameRef: ElementRef;
  @ViewChild('datetime', { static: false }) dateRef: ElementRef;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private navbarService: NavbarService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {}
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onAddProduct() {
    const date = new Date(this.dateRef.nativeElement.value);
    const name = this.nameRef.nativeElement.value;
    const description = this.descRef.nativeElement.value;
    const asset = this.assetRef.nativeElement.value;
    this.navbarService
      .createProduct({
        name,
        description,
        asset,
        endTimeStamp: date.toISOString(),
        userId: this.currentUser?._id ?? '',
      })
      .subscribe((data) => {
        this.modal = false;
      });
  }
}
