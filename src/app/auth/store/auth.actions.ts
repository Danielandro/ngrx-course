import { User } from "../model/user.model";

export class Login {
  static readonly type = "[Login Page] User Login";
  constructor(public email: string, public password: string) { }
}

export class LoginSuccessful {
  static readonly type = "[Login Action] Login Successful";
  constructor(public payload: User) { }
}

export class LoginFailed {
  static readonly type = "[Login Action] Login Failed";
  constructor(public error: any) { }
}

export class Logout {
  static readonly type = "[Top Menu] Logout"; // no payload req'd
}
