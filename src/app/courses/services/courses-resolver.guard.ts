import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { FetchAllCourses } from '../store/courses.actions';
import { CoursesState } from '../store/courses.state';
import { tap, finalize, first, map, switchMap } from 'rxjs/operators';
import { CoursesModule } from '../courses.module';

@Injectable()
export class CoursesResolverGuard implements Resolve<any> {
  loading = false;
  @Select(CoursesState.areCoursesLoaded) coursesLoaded$: Observable<boolean>;

  constructor(private store: Store) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return this.coursesLoaded$
      .pipe(
        map(coursesLoaded => {
          if (!this.loading && !coursesLoaded) {
            this.loading = true;
            return this.store.dispatch(new FetchAllCourses()); // sends http request + add courses to state
          }
        }),
        first(), // executes once action completed
        finalize(() => this.loading = false)
      );
  }

}
