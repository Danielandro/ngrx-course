import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
    // show whole state tree
    // this.store.subscribe(state => console.log("Store value: ", state));

    // if user undefined, then return true
    this.isLoggedOut$ = this.store.pipe(
      tap(state => console.log("Current User: ", state["auth"].user)),
      map(state => !state["auth"].user)
    );

    // if user undefined, return false
    this.isLoggedIn$ = this.store.pipe(
      tap(state => console.log("Current User: ", state["auth"].user)),
      map(state => !!state["auth"].user) // DOUBLE BANG!!
    );

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

  }

}
