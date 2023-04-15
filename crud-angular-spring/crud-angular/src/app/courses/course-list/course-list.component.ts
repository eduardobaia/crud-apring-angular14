import { Component, Input } from '@angular/core';
import { Course } from '../courses/models/course';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  @Input()  courses: Course[] = [];
  readonly displayedColumns = ['name', 'category', 'actions'];


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){

  }


  onAdd(){
  this.router.navigate(['new'],  {relativeTo: this.route});
   // this.router.navigate(['new'], { relativeTo: this.route });
  }



}
