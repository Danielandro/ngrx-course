import { EntityStateAdapter, EntityState } from "@ngrx/entity/src/models";
import { Course, compareCourses } from "../model/course";
import { createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

// by extending the adapter, we now have access to the adapters CRUD methods
// on our CoursesState
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

// adapter exposes CRUD (+other) methods on entity api
export const adapter = createEntityAdapter<Course>({
  // sorts courses by seqNo (ascending)
  sortComparer: compareCourses
});

// initial state: { ids: [], entities: {} }
export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => adapter.addAll(action.courses, {
    ...state,
    allCoursesLoaded: true
  })),
  on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state))
);

// grab built selectors from the adapter
export const { selectAll } = adapter.getSelectors();

