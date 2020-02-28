import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Course } from '../model/course';
import { FetchAllCourses, AllCoursesLoaded } from './courses.actions';
import { CoursesHttpService } from '../services/courses-http.service';
import { map, concatMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface CoursesStateModel {
  courses: Course[];
  coursesLoaded: boolean;
}

@State<CoursesStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    coursesLoaded: false
  }
})
@Injectable()
export class CoursesState {
  constructor(private coursesHttpService: CoursesHttpService) { }
  // whole state
  @Selector()
  public static getState(state: CoursesStateModel) {
    return state;
  }

  // all courses
  @Selector([CoursesState.getState])
  public static SelectCourses(state: CoursesStateModel) {
    return state.courses;
  }

  // are courses loaded?
  @Selector()
  public static areCoursesLoaded(state: CoursesStateModel) {
    return state.coursesLoaded;
  }

  // filter for beginner courses
  @Selector()
  public static selectBeginnerCourses(state: CoursesStateModel) {
    return state.courses.filter(course => course.category === "BEGINNER");
  }

  // filter for advanced courses∏
  @Selector()
  public static selectAdvancedCourses(state: CoursesStateModel) {
    return state.courses.filter(course => course.category === "ADVANCED");
  }

  // number of courses on promotion
  @Selector()
  public static selectPromoTotal(state: CoursesStateModel) {
    return state.courses.filter(course => course.promo).length;
  }

  // makes API request to get all courses
  // if successful, triggger next action to add courses to state
  // if error, alert => unable to retrieve courses - NOT IMPLEMENTED
  @Action(FetchAllCourses)
  fetch({ dispatch, getState, patchState }: StateContext<CoursesStateModel>) {
    return this.coursesHttpService.findAllCourses()
      .pipe(
        // only once courses have loaded, dispatch next action
        tap(courses => {
          patchState({
            courses,
            coursesLoaded: true
          });
        })
      );
  }

  @Action(AllCoursesLoaded)
  coursesLoaded({ getState, patchState }: StateContext<CoursesStateModel>, { payload }: AllCoursesLoaded) {

  }

}
