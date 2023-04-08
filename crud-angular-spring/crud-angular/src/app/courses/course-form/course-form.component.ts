import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private service: CoursesService, private _snackBar: MatSnackBar){
      this.form = this.formBuilder.group({

          name:[null],
          category:[null]

      });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.service.save(this.form.value).subscribe( result => {
      console.log(result)
    }, error => {
      this.onError();
      console.log("error")
    });
  }

  onCancel(){
    console.log(this.form.value)

  }

  //or this one
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  private onError() {
    this._snackBar.open("Error while saving!", "Close", {duration: 5000})
  }

}
