import { Course } from "../model/course";

// triggered by Courses resolver
// make request to CoursesService - fetch all courses
export class FetchAllCourses {
  static readonly type = "[Courses Resolver] Fetch Courses";
}



// once courses have been fetched
// mutate state, loading course into store
export class FetchCoursesSuccessful {
  static readonly type = "[Fetch Courses Action] Load All Courses";
  constructor(public payload: Course[]) { }
}
export class FetchCoursesFailed {
  static readonly type = "[Fetch Courses Action] Load All Courses";
  constructor(public error: any) { }
}
