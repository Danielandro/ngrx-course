import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

// dispatched by route resolver before courses page loads
// passes the url for the courses API
export const loadAllCourses = createAction(
  "[Courses Resolver]"
);

// dispatched by the course effect, which makes the api request to get all courses
// once complete, it returns this action, passing in the courses data
// the resolver will then return new state using this data
// the component can then retrieve course from state on init
export const allCoursesLoaded = createAction(
  "[Courses Effect]",
  props<{ courses: Course[]; }>()
);
