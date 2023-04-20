import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({

    // name: ['', [Validators.required]],
    // name: new FormControl('', {nonNullable: true}),
    _id: [''],
    name: [''],
    category: [''],

  });

  //quando todos os cmapos forem obrigatgorio, usa se o nonNullFormBuilder..
  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ) {
      const course: Course = this.route.snapshot.data['course'];
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category
      })

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => {
      this.onSucess();
    }, error => {
      this.onError();
      console.log("error")
    });
  }

  onCancel() {
    console.log(this.form.value)
    this.location.back();
  }


  onSucess() {
    this._snackBar.open("Course saved with success!", "Close", { duration: 5000 });
    this.onCancel();
  }

  //or this one
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  private onError() {
    this._snackBar.open("Error while saving!", "Close", { duration: 5000 })
  }

}
