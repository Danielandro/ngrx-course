import { State, Action, StateContext } from "@ngxs/store";
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
  @Action(Login)
  login({ getState, patchState }: StateContext<AuthStateModel>, { payload }: Login) {
    const state = getState();

    patchState({
      user: payload
    });
  }
}
