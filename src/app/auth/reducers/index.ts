import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export interface AuthState {
  user: User;
}

// on start, no user is defined
const initialAuthState = {
  user: undefined
};

// state is auth: {} here
export const AuthReducer = createReducer(
  initialAuthState, // pass in initial state
  on(AuthActions.login, (state, action) => {
    return { user: action.user };
  }),
  on(AuthActions.logout, state => {
    return { user: undefined };
  })
);

