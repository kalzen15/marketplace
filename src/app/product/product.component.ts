import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  profileMenu = false;
  product: any;
  private counter$: any;
  private subscription: Subscription;
  message: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.product = this.router.getCurrentNavigation()?.extras.state;
    console.log('this.product', this.product);
  }
  dhms(t: any) {
    var years, days, hours, minutes, seconds;
    years = Math.floor(t / (86400 * 365));
    t -= years * (86400 * 365);
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      years > 0 ? years + 'y' : '',
      days + 'd',
      hours + 'h',
      minutes + 'm',
      seconds + 's',
    ].join(' ');
  }

  ngOnInit(): void {
    this.counter$ = interval(1000);

    this.subscription = this.counter$.subscribe(
      (x: any) =>
        (this.message = this.dhms(
          Math.floor((this.product.endTimeStamp.getTime() - Date.now()) / 1000)
        ))
    );
  }
}
