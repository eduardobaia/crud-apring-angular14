import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first, tap } from 'rxjs';

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
      delay(500),
      tap(courses => console.log(courses))
    );
  }



  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }


  save(record:Partial<Course>){
    if(record._id){
      console.log("entrou em update "+ record._id)
      return this.update(record);
    }
    console.log("entrou em create "+  record._id)
    return this.create(record);
  }


  private create(record:Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update ( record:Partial<Course>) {
   return  this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first())
  }
}
