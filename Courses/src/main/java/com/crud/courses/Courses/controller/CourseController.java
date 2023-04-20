package com.crud.courses.courses.controller;

import com.crud.courses.courses.model.Course;
import com.crud.courses.courses.repository.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@Component
@AllArgsConstructor
public class CourseController {


    private CourseRepository courseRepository;



    @GetMapping
    public List<Course> list(){
        return courseRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Course> create(@RequestBody Course course){
        //Vantagem do responseEntity, caso precise alterar algum dado do header do rsponse, voce tem todos os metodos pra isto.
        //quando quer retornar somente o status, pode se usar a anotacao. @ResponseStatus
       return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findByid(@PathVariable Long id){
        return courseRepository.findById(id).map(
                data -> ResponseEntity.ok().body(data))
                .orElse(ResponseEntity.notFound().build());
    }


}
