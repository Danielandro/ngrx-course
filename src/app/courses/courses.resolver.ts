import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { tap, first, finalize, filter } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { areCoursesLoaded } from "./courses.selectors";

@Injectable()

// makes sure page doesn't show until data has been fetched
export class CoursesResolver implements Resolve<any> {
  isLoading = false;
  constructor(private store: Store<AppState>) { }

  // ActivatedRouteSnapshot -> info about currently activated route e.g url,
  // RouterStateSnapshot -> info about router params, query params
  // returns the resolved data
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.store.pipe(
      // select coursesLoaded boolean
      select(areCoursesLoaded),
      // trigger action here as a side effect
      tap((areCoursesLoaded) => {
        // if page is not already loading && courses are not loaded in state,
        // change flag and dispatch action - ASYNC!!
        if (!this.isLoading && !areCoursesLoaded) {
          this.isLoading = true;
          this.store.dispatch(CourseActions.loadAllCourses());
        }
      }),
      // only emit value if courses have been loaded
      filter(areCoursesLoaded => areCoursesLoaded),
      // waits for first value to emit, then allows stream to be completed
      first(),
      // called when observable completes or errors
      // resets isLoading to false
      finalize(() => this.isLoading = false)
    );
  }
}
