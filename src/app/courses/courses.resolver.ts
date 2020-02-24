import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Course } from "./model/course";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { tap, first, finalize } from "rxjs/operators";
import { CourseActions } from "./action-types";

@Injectable()

// makes sure page doesn't show until data has been fetched
export class CoursesResolver implements Resolve<any> {
  isLoading = false;
  constructor(private store: Store<AppState>) { }

  // ActivatedRouteSnapshot -> info about currently activated route e.g url,
  // RouterStateSnapshot -> info about router params, query params
  // returns an Observable
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      // trigger action here as a side effect
      tap((data) => {
        // if page is not already loading, change flag and dispatch action
        if (!this.isLoading) {
          this.isLoading = true;
          this.store.dispatch(CourseActions.loadAllCourses());
        }

      }),
      // waits for first value to emit, then allows stream to be completed
      first(),
      // called when observable completes or errors
      // resets isLoading to false
      finalize(() => this.isLoading = false)
    );
  }
}
