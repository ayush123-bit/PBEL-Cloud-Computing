package com.iitb.courses.courses_api.controller;

import com.iitb.courses.courses_api.model.Course;
import com.iitb.courses.courses_api.model.CourseInstance;
import com.iitb.courses.courses_api.service.CourseInstanceService;
import com.iitb.courses.courses_api.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final CourseInstanceService courseInstanceService;

    // ------------------ COURSE Endpoints ------------------

    @PostMapping("/courses")
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        if (course.getPrerequisites() != null) {
            for (String prereqCourseId : course.getPrerequisites()) {
                Course prereq = courseService.getCourseByCourseId(prereqCourseId);
                if (prereq == null) {
                    return ResponseEntity
                            .status(HttpStatus.BAD_REQUEST)
                            .body("Invalid prerequisite course ID: " + prereqCourseId);
                }
            }
        }

        Course saved = courseService.createCourse(course);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<?> getCourseByCourseId(@PathVariable String courseId) {
        Course course = courseService.getCourseByCourseId(courseId);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }
        return ResponseEntity.ok(course);
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable String courseId) {
        Course courseToDelete = courseService.getCourseByCourseId(courseId);
        if (courseToDelete == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }

        if (courseService.isPrerequisite(courseId)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Cannot delete course; it is a prerequisite for another course.");
        }

        courseService.deleteCourseByCourseId(courseId);
        return ResponseEntity.noContent().build();
    }

    // ------------------ INSTANCE Endpoints ------------------

    @PostMapping("/instances")
    public ResponseEntity<?> createInstance(@RequestBody CourseInstance instance) {
        Course course = courseService.getCourseByCourseId(instance.getCourseId());
        if (course == null) {
            return ResponseEntity.badRequest().body("Invalid Course ID");
        }

        CourseInstance saved = courseInstanceService.createInstance(instance);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/instances/{year}/{semester}")
    public ResponseEntity<List<CourseInstance>> getInstancesByYearSemester(
            @PathVariable int year,
            @PathVariable int semester
    ) {
        List<CourseInstance> list = courseInstanceService.getInstancesByYearAndSemester(year, semester);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/instances/{year}/{semester}/{courseId}")
    public ResponseEntity<?> getInstanceDetail(
            @PathVariable int year,
            @PathVariable int semester,
            @PathVariable String courseId
    ) {
        CourseInstance instance = courseInstanceService.getInstanceByCourseIdAndYearSemester(courseId, year, semester);
        if (instance == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Instance not found");
        }
        return ResponseEntity.ok(instance);
    }

    @DeleteMapping("/instances/{year}/{semester}/{courseId}")
    public ResponseEntity<?> deleteInstance(
            @PathVariable int year,
            @PathVariable int semester,
            @PathVariable String courseId
    ) {
        try {
            courseInstanceService.deleteInstance(courseId, year, semester);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
