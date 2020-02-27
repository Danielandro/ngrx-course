import { State, Action, StateContext, Selector } from "@ngxs/store";
import { User } from "../model/user.model";
import { Injectable } from "@angular/core";
import { Login, Logout } from "./auth.actions";

export class AuthStateModel {
  user: User;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    user: undefined
  }
})

@Injectable()

export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return !!state.user;
  }

  @Selector()
  static isLoggedOut(state: AuthStateModel) {
    return !state.user;
  }

  @Action(Login)
  login({ getState, patchState }: StateContext<AuthStateModel>, { payload }: Login) {
    const state = getState();

    patchState({
      user: payload
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
