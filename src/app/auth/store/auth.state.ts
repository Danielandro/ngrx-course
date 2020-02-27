import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { User } from "../model/user.model";
import { Injectable } from "@angular/core";
import { Login, Logout, LoginSuccessful, LoginFailed } from "./auth.actions";
import { AuthService } from "../auth.service";
import { tap, map, catchError } from "rxjs/operators";

export class AuthStateModel {
  user: User;
  error?; // optional error
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    user: undefined
  }
})

@Injectable()

export class AuthState {
  constructor(private authService: AuthService) { }

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return !!state.user;
  }

  @Selector()
  static isLoggedOut(state: AuthStateModel) {
    return !state.user;
  }

  @Selector()
  static loginErrorMessage(state: AuthStateModel) {
    return state.error;
  }


  @Action(Login)
  login({ dispatch }: StateContext<AuthStateModel>, { email, password }: Login) {
    // take login credentials and call the service. It returns a User (or error)
    return this.authService.login(email, password).pipe(
      tap(() => console.log("Login Action calling AuthService.login:")),
      // dispatch success action with user
      map((user) => dispatch(new LoginSuccessful(user))),
      // any error that occurs with the request
      catchError(err => dispatch(new LoginFailed(err)))
    );
  }

  // add user to state
  @Action(LoginSuccessful)
  success({ patchState }: StateContext<AuthStateModel>, { payload }: LoginSuccessful) {
    patchState({ user: payload });
  }

  // add error to state
  @Action(LoginFailed)
  failed({ getState, patchState }: StateContext<AuthStateModel>, { error }: LoginFailed) {
    patchState({
      ...getState(),
      error
    });
  }

  @Action(Logout)
  logout({ getState, patchState }: StateContext<AuthStateModel>) {
    const state = getState();
    patchState({
      user: undefined
    });
  }
}
