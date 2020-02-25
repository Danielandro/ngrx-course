import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

// dispatched by route resolver before courses page loads
// passes the url for the courses API
export const loadAllCourses = createAction(
  "[Courses Resolver] Load all courses"
);

// dispatched by the course effect, which makes the api request to get all courses
// once complete, it returns this action, passing in the courses data
// the resolver will then return new state using this data
// the component can then retrieve course from state on init
export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All courses loaded",
  props<{ courses: Course[]; }>()
);

// pass in an Update object - provided by NgRx
export const courseUpdated = createAction(
  "[Edit Course Dialog] Course Updated",
  props<{ update: Update<Course>; }>()
);
