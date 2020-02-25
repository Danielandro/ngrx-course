import { createEffect, ofType, Actions } from "@ngrx/effects";
import { CourseActions } from "./action-types";
import { Injectable } from "@angular/core";
import { } from "@ngrx/store";
import { CoursesHttpService } from "./services/courses-http.service";
import { tap, concatMap, map } from "rxjs/operators";
@Injectable()

// filter for certain actions
// make http call via service - use concatMap to flatten into one observable
// return an action, passing in the courses as an argument
export class CoursesEffects {
  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.loadAllCourses),
    concatMap(() => this.coursesHttpService.findAllCourses()),
    map(courses => CourseActions.allCoursesLoaded({ courses }))

  )
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService) { }
}
