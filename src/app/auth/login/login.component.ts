import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store, Select } from "@ngxs/store";

import { AuthService } from "../auth.service";
import { tap, switchMap } from "rxjs/operators";
import { noop, Observable } from "rxjs";
import { Router } from "@angular/router";
import { Login } from '../store/auth.actions';
import { AuthState } from '../store/auth.state';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @Select(AuthState.loginErrorMessage) loginError$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    // get form data
    const formData = this.form.value;

    // dispatch login credentials
    // the subscribe only fires once the dispatched actions have completed
    this.store.dispatch(new Login(formData.email, formData.password)).pipe(
      switchMap(() => this.loginError$)).subscribe(
        (loginError) => {
          if (loginError) {
            console.log("Error: ", loginError);
            alert("Login unsuccessful");
          } else {
            this.router.navigateByUrl("/courses");
          }
        });

    // call auth service to validate user
    // returns Observable<User>
    // this.auth.login(formData.email, formData.password).pipe(
    //   // take response from service and save to state
    //   tap(user => {
    //     // dispatch login action
    //     this.store.dispatch(new Login(user));
    //     // redirect user to /courses
    //     this.router.navigateByUrl("/courses");
    //   })
    // )
    //   // subscribe to initiate request
    //   .subscribe(
    //     noop, // no operation if successful
    //     () => alert("Login Failed")
    //   );
  }

}

