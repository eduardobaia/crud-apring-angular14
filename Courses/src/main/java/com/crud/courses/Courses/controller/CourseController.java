package com.crud.courses.courses.controller;

import com.crud.courses.courses.model.Course;
import com.crud.courses.courses.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
