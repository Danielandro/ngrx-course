import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

// gets single feature state branch from global state
// also adds type safety and autocomplete features
export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  // state => state["auth"] -> slice of state needed - mapping function
  selectAuthState, // same as above line
  auth => !!auth.user // projector function
);

export const isLoggedOut = createSelector(
  isLoggedIn, // selectors are also mapping function so can be passed to other selectors
  loggedIn => !loggedIn
);
