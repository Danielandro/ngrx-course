import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects {
  // createEffect will:
  // * subscribe to the observable passed in to it
  // * handle errors - observable gets re-created if error occurs
  // * ofType allows Type safety
  login$ = createEffect(() => {
    return this.action$.pipe(
      // filter for only login action
      ofType(AuthActions.login),
      // side effect here
      tap(action => localStorage.setItem("user", JSON.stringify(action.user)))
    );
  },
    { dispatch: false }); // this side effect does not result in dispatching of an action

  logout$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.logout),
      tap(action => {
        localStorage.removeItem("user");
        this.router.navigateByUrl("/login");
      }));
  }, { dispatch: false });

  // Actions is an effects service that emits an observable when an action occurs
  constructor(private action$: Actions, private router: Router) {
    // Actions is an observable stream of all Actions that are dispatched

  }


}
