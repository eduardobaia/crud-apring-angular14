import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  //add $ a variavel pra indicar que isto e um observable
  courses$: Observable<Course[]> | null = null ;


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.refresh();
  }
  ngOnInit(): void {

  }

  refresh(){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar cursos')
        return of([])
      })
    );
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onRemove(course: Course) {
    this.coursesService.remove(course._id).subscribe(
      () => {
        this.refresh();
        this._snackBar.open("Couse deleted with sucess!", "X", { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
      },
      error => this.onError("Error when removiong course")
    );
  }

}
