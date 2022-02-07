import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { interval } from 'rxjs';
import { User } from '../_models';
import { Product } from '../_models/product';
import { AlertService } from '../_services/alert.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  profileMenu = false;
  product: Product;
  private counter$: any;
  private subscription: Subscription;
  message: string;
  modal = false;
  isAvailable = true;
  currentUser: User;
  currentUserId: string;
  saleByUser = false;
  @ViewChild('bidAmount', { static: false }) bidAmountRef: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private alertService: AlertService
  ) {
    this.product = this.router.getCurrentNavigation()?.extras.state as Product;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    this.currentUserId = this.currentUser['_id'];
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
    this.updateProduct();
    if (this.product.userId === this.currentUserId) {
      console.log('this.product.userId', this.product.userId);
      console.log('this.current.userId', this.currentUserId);
      this.saleByUser = true;
    }
    this.counter$ = interval(1000);
    const productTime: Date = new Date(this.product.endTimeStamp);
    if (productTime.setHours(0, 0, 0, 0) < Date.now()) {
      this.isAvailable = false;
    }

    this.subscription = this.counter$.subscribe(
      (x: any) =>
        (this.message = this.dhms(
          Math.floor((productTime.getTime() - Date.now()) / 1000)
        ))
    );
  }
  updateProduct() {
    this.productService.getProduct(this.product._id).subscribe((product) => {
      this.product = product as Product;
      console.log('product', product);
    });
  }

  onPlaceBid() {
    var amount: number = this.bidAmountRef.nativeElement.value;
    if (amount > this.currentUser.walletBalance) {
      this.alertService.error('Add Money to wallet');

      this.modal = false;
      return;
    }
    if (
      this.product.bidsList.length > 0 &&
      amount < this.product.bidsList.reverse()[0].price
    ) {
      this.alertService.error(
        `Bid Should be higher than ${this.product.bidsList.reverse()[0].price} `
      );

      this.modal = false;
      return;
    }
    const date = new Date();
    var product = {
      asset: this.product.asset,
      name: this.product.name,
      price: amount,
      time: date.toISOString(),
    };
    this.productService
      .placeBid(
        this.product._id,
        {
          name: this.currentUser.name,
          email: this.currentUser.email,
          userId: this.currentUserId,
          price: amount,
          time: date.toISOString(),
        },
        product
      )
      .subscribe((data) => {
        console.log('data', data);
        this.modal = false;
        this.updateProduct();
      });
  }

  onEndSale() {
    const date = new Date();
    var lastBid = this.product.bidsList.reverse()[0];
    var product = {
      asset: this.product.asset,
      name: this.product.name,
      price: lastBid.price,
      time: date.toISOString(),
    };
    var buyer = {
      userId: lastBid.userId,
      price: lastBid.price,
    };
    var seller = {
      userId: this.currentUserId,
    };
    this.productService
      .endSale(this.product._id, buyer, product, seller, lastBid)
      .subscribe((data) => {
        console.log('data', data);
        this.updateProduct();
      });
  }
}
