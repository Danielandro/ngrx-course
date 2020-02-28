import { Component, OnInit } from '@angular/core';
import { compareCourses, Course } from '../model/course';
import { Observable } from "rxjs";
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { Select, Store } from '@ngxs/store';
import { CoursesState } from '../store/courses.state';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>; // use selector

  beginnerCourses$: Observable<Course[]>; // use selector

  advancedCourses$: Observable<Course[]>; // use selector


  constructor(
    private dialog: MatDialog,
    private coursesHttpService: CoursesHttpService,
    private store: Store) {

  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.select(CoursesState.selectBeginnerCourses);
    this.advancedCourses$ = this.store.select(CoursesState.selectAdvancedCourses);
    this.promoTotal$ = this.store.select(CoursesState.selectPromoTotal);
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
