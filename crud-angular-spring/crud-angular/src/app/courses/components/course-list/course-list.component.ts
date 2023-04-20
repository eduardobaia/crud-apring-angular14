import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  @Input()  courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  readonly displayedColumns = ['name', 'category', 'actions'];


  constructor(
  ){

  }


  onAdd(){
  //this.router.navigate(['new'],  {relativeTo: this.route});
   // this.router.navigate(['new'], { relativeTo: this.route });

   this.add.emit(true);

  }


  onEdit(course: Course){
    this.edit.emit(course)
  }

}
