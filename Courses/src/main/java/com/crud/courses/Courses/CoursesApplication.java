package com.crud.courses.courses;

import com.crud.courses.courses.model.Course;
import com.crud.courses.courses.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CoursesApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoursesApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository courseRepository){
		return args -> {
		//	courseRepository.deleteAll();
			Course course = new Course();
			course.setName("Angular com spring");
			course.setCategory("front-end");
			courseRepository.save(course);
		};
	}

}
