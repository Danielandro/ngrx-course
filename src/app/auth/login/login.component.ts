import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from '../../reducers';
import { AuthActions } from "../action-types";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    // pull in global store
    private store: Store<AppState>) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  // when user submits login form
  login() {
    const val = this.form.value; // user info from the form
    this.auth.login(val.email, val.password).pipe(
      tap(user => {
        // log user
        // console.log("User: ", user);
        // dispatch login action to store
        this.store.dispatch(AuthActions.login({ user }));
        // redirect to courses page
        this.router.navigateByUrl("/courses");

      }) // use to execute side effects
    ).subscribe(
      noop, // no operation if successful
      () => alert("Login Failed") // alert if error occurs
    );
  }

}

