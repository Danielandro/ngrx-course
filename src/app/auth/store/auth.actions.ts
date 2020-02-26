import { User } from "../model/user.model";

export class Login {
  static readonly type = "[Login Page] User Login";
  constructor(public payload: User) { }
}

export class Logout {
  static readonly type = "[Top Menu] Logout"; // no payload req'd
}
