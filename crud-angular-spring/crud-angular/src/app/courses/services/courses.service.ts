import { Course } from './../courses/models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

//Inectable, diz que vai fazer parte da injecao de depndencias do angular
@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  private readonly API = '/api/courses';

  constructor(private httpClient: HttpClient) { }


  list(){
    
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(), //corta subscricao depois que faz a primeira chamada
      delay(1000),
      tap(courses => console.log(courses))
    );
  }

}
