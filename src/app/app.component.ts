import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { Store, Select } from "@ngxs/store";
import { AuthState } from './auth/store/auth.state';
import { Logout } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // use selector to check if user is defined in state
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;
  @Select(AuthState.isLoggedOut) isLoggedOut$: Observable<boolean>;
  loading = true;
  private unsubscribe$ = new Subject<void>(); // use to complete subscriptions

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
    this.store.dispatch(new Logout()).pipe(
      takeUntil(this.unsubscribe$)) // end when component is destroyed
      .subscribe(() => this.router.navigateByUrl("/login"));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
