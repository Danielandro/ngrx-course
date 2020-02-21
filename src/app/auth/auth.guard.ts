import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";
import { AuthModule } from "./auth.module";

@Injectable({
  providedIn: AuthModule
})

export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { };

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    // access global store
    // use selector to slice out logged in state
    // returns a boolean observable
    return this.store.pipe(
      select(isLoggedIn),
      // use tap for side effects. In this case, redirect user to login page
      tap(loggedIn => {
        // if not logged in redirect to login page else return true
        if (!loggedIn) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }

}
