import { State, Selector, Action, StateContext, createSelector, Select } from '@ngxs/store';
import { Course, compareCourses } from '../model/course';
import { CoursesActions } from './courses.action-types';
import { CoursesHttpService } from '../services/courses-http.service';
import { map, concatMap, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEntityAdapter, EntityState } from "ngxs-entity";
import { Observable } from 'rxjs';

// define state as an entity
export interface CoursesStateModel extends EntityState<Course> {
  isLoaded: boolean;
  error?; // optional error
}

// add adapter to state - gives us shorthand for CRUD actions
export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

// save adapter methods as constants
const { selectAll, selectEntities, selectTotal } = adapter.getSelectors();

@State<CoursesStateModel>({
  name: 'courses',
  defaults: adapter.getInitialState({
    isLoaded: false
  })
})
@Injectable()
export class CoursesState {
  constructor(private coursesHttpService: CoursesHttpService) { }

  // dynamic selector for filtering courses by category
  static selectCoursesByCategory(type: string) {
    return createSelector(
      [CoursesState.SelectCourses],
      (courses: Course[]) => {
        return courses.filter(course => course.category === type);
      }
    );
  }

  // all courses
  @Selector()
  public static SelectCourses(state: CoursesStateModel) {
    return selectAll(state);
  }

  // are courses loaded?
  @Selector()
  public static areCoursesLoaded(state: CoursesStateModel) {
    return state.isLoaded;
  }

  // filter for beginner courses
  // @Selector()
  // public static selectBeginnerCourses(state: CoursesStateModel) {
  //   return selectAll(state).filter(course => course.category === "BEGINNER");
  // }


  // filter for advanced courses∏
  // @Selector()
  // public static selectAdvancedCourses(state: CoursesStateModel) {
  //   return selectAll(state).filter(course => course.category === "ADVANCED");
  //   // return state.entities.selectEntities((course => course.category === "ADVANCED"))
  // }

  // number of courses on promotion
  @Selector([CoursesState])
  public static selectPromoTotal(state: CoursesStateModel) {
    // return state.courses.filter(course => course.promo).length;
    return selectAll(state).filter(course => course.promo).length;
  }

  // makes API request to get all courses
  // if successful, triggger next action to add courses to state
  // if error, alert => unable to retrieve courses - NOT IMPLEMENTED
  @Action(CoursesActions.FetchAllCourses)
  fetch({ dispatch }: StateContext<CoursesStateModel>) {

    return this.coursesHttpService.findAllCourses()
      .pipe(
        // only once courses have loaded, dispatch next action
        // dispatch success action
        tap(courses => {
          dispatch(new CoursesActions.FetchCoursesSuccessful(courses));
        }),
        // if error - dispatch load failed action
        catchError(err => dispatch(new CoursesActions.FetchCoursesFailed(err)))
      );
  }

  @Action(CoursesActions.FetchCoursesSuccessful)
  loadSuccess({ getState, patchState }: StateContext<CoursesStateModel>, { payload }: CoursesActions.FetchCoursesSuccessful) {
    const state = getState();

    patchState({
      ...adapter.addAll(payload, state),
      isLoaded: true
    });
    // patchState({
    //   ...state,
    //   isLoaded: true
    // });
  }

  @Action(CoursesActions.FetchCoursesFailed)
  loadFail({ getState, patchState }: StateContext<CoursesStateModel>, { error }: CoursesActions.FetchCoursesFailed) {
    patchState({
      ...getState(),
      error
    });
  }

}
