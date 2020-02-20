import { createSelector } from "@ngrx/store";

export const isLoggedIn = createSelector(
  state => state["auth"], // slice of state needed - mapping function
  auth => !!auth.user // projector function
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
