import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { Store, Select } from "@ngxs/store";
import { AuthState } from './auth/store/auth.state';
import { Logout } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  // use selector to check if user is defined in state
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;
  @Select(AuthState.isLoggedOut) isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {

  }

  ngOnInit() {

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
