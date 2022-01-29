import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private router: Router) {
    // if (this.authenticationService.currentUserValue) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    // this.userService
    //   .register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.alertService.success('Registration successful', true);
    //       this.router.navigate(['/login']);
    //     },
    //     (error) => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   );
  }
}
