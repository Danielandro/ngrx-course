import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { AuthState } from "../store/auth.state";
import { tap } from "rxjs/operators";
import { AuthModule } from "../auth.module";

@Injectable({
  providedIn: AuthModule
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(AuthState.isLoggedIn).pipe(
      tap(loggedIn => {
        console.log("GUARD ACTIVATED");
        if (!loggedIn) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
