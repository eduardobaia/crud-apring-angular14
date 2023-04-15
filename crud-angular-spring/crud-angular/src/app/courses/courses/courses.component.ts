import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Course } from './models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{

  //add $ a variavel pra indicar que isto e um observable
  courses$: Observable<Course[]>;


  constructor(
    private coursesService: CoursesService,
     public dialog: MatDialog,
     private router: Router,
     private route: ActivatedRoute
     ){
    this.courses$= coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar cursos')
        return of([])
      })
    );
  }
  ngOnInit(): void {

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  onAdd(){
    console.log("PESSIONOUY");
 this.router.navigate(['new'],  {relativeTo: this.route});
   // this.router.navigate(['new'], { relativeTo: this.route });
  }

}
