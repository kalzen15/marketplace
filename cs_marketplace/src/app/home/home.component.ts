import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profileMenu = false;
  topProducts: Product[];
  //   = [
  //     {
  //       asset:
  //         'https://lh3.googleusercontent.com/IZ5z4tppxxKfP-NHX9WgAFTyyoqFes1ReQ0M0CybiicFvKbngSbrIzkynxpccgSxkL2QILZ6qXELm-SU61j3bDHN3RDhQMTOekLr9w=w600',
  //       name: '#6188',
  //       description: 'Created by BoredApeYachtClub',
  //       sold: false,
  //       endTimeStamp: new Date(2023, 3, 14),
  //       bidsList: [
  //         { name: 'Calvin', email: 'test@testing.in', price: 2500 },
  //         { name: 'Calvin', email: 'test@testing.in', price: 1500 },
  //         { name: 'John', email: 'john@testing.in', price: 1000 },
  //       ],
  //     },
  //     {
  //       asset:
  //         'https://lh3.googleusercontent.com/H004BnpoASX8Vt65RM_KfFapAzVPt6rlw8ZTuAa1leiYZxrgGhZIug-Eg70pXMCb8NP6wf0mqfvmuEUyocnn9O5uDlSu6-e1dFoIi2k=w600',
  //       name: '#6019',
  //       description: 'Created by BoredApeYachtClub',
  //       sold: false,
  //       endTimeStamp: new Date(2024, 8, 14),
  //       bidsList: [
  //         { name: 'Calvin', email: 'test@testing.in', price: 2500 },
  //         { name: 'Calvin', email: 'test@testing.in', price: 1500 },
  //         { name: 'John', email: 'john@testing.in', price: 1000 },
  //       ],
  //     },
  //   ];

  newProducts: Product[];
  //   = [
  //     {
  //       asset:
  //         'https://lh3.googleusercontent.com/kqXYTqDSGFnIkpGY3VfLJRzaaXKOI4Z3G7RViCQy6xpFxCDE21ZA0ic9rPeaNZOFZCWjO923DgOzk0ohMY9O49bDziK0AosimEvz=w600',
  //       name: '#3814',
  //       description: 'Created by BoredApeKennelClub',
  //       sold: false,
  //       endTimeStamp: new Date(2023, 3, 14),
  //       bidsList: [
  //         { name: 'Calvin', email: 'test@testing.in', price: 2500 },
  //         { name: 'Calvin', email: 'test@testing.in', price: 1500 },
  //         { name: 'John', email: 'john@testing.in', price: 1000 },
  //       ],
  //     },
  //     {
  //       asset:
  //         'https://lh3.googleusercontent.com/pGEj9wQ-UDpPuniY-jthrjLlEiXbJR8h24bK9EmkaTHu3lfT6elyweUwzG1Pcr0mZzWqhQFeupJMtIi50jOfaIRJGJlb8VPbt41lQg=w600',
  //       name: '#6590',
  //       description: 'Created by BoredApeKennelClub',
  //       sold: false,
  //       endTimeStamp: new Date(2023, 3, 14),
  //       bidsList: [
  //         { name: 'Calvin', email: 'test@testing.in', price: 2500 },
  //         { name: 'Calvin', email: 'test@testing.in', price: 1500 },
  //         { name: 'John', email: 'john@testing.in', price: 1000 },
  //       ],
  //     },
  //     {
  //       asset:
  //         'https://lh3.googleusercontent.com/BkVEIXRUddl27n_tiFxr9eopRGgAbL7PvDBfMxfljr3lvycl5QedYVczvSbG1_NYq-EIG6boHI85mCQ5jh_1WiBPZ4ACUcZXYYSQ=w600',
  //       name: '#3814',
  //       description: 'Created by BoredApeKennelClub',
  //       sold: false,
  //       endTimeStamp: new Date(2029, 3, 14),
  //       bidsList: [
  //         { name: 'Calvin', email: 'test@testing.in', price: 2500 },
  //         { name: 'Calvin', email: 'test@testing.in', price: 1500 },
  //         { name: 'John', email: 'john@testing.in', price: 1000 },
  //       ],
  //     },
  //   ];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService
      .getTop()
      .subscribe((data: any) => (this.topProducts = data));
    this.homeService
      .getLatest()
      .subscribe((data: any) => (this.newProducts = data));
  }
}
