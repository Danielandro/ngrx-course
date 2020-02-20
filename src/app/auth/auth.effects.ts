import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()

export class AuthEffects {
  // Actions is an effects service that emits an observable when an action occurs
  constructor(private action$: Actions) {
    // By subscribing, we have access to any actions emitted in this module
    action$.subscribe(action => {
      if (action.type === "[Login Page] User Login") {
        localStorage.setItem("user", JSON.stringify(action.user));
      }
    });
  }


}
