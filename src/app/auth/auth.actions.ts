import { props, createAction } from "@ngrx/store";
import { User } from "./model/user.model";

// action creator - when called it creates an instance of Action class
export const login = createAction(
  "[Login Page] User Login", // [Source of Action] event/command action corresponds to
  props<{ user: User; }>()
);
