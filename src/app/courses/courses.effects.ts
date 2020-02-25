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

  saveCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.courseUpdated),
      // save course update to backend
      // by using concatMap, we make sure saves are completed sequentially
      // another request won't begin until the previous has completed
      concatMap((action) => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService) { }
}
