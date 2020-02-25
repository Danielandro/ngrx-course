import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./reducers/courses.reducers";
import * as fromCourses from "./reducers/courses.reducers";

// Feature selector - slice of just courses
export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
  // get just courses state
  selectCoursesState,
  // use entity adapter method to select all courses (in order)
  fromCourses.selectAll
);

// filter for beginner courses
export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(
    course => course.category === "BEGINNER"
  )
);;

// filter for advanced courses
export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(
    course => course.category === "ADVANCED"
  )
);

// select number of items on promo
export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

// select allCoursesLoaded flag from state
export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
