package com.iitb.courses.courses_api.service;

import com.iitb.courses.courses_api.model.Course;
import com.iitb.courses.courses_api.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course getCourseById(String id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course updateCourse(String id, Course updatedCourse) {
        Optional<Course> courseOpt = courseRepository.findById(id);
        if (courseOpt.isPresent()) {
            Course course = courseOpt.get();
            course.setTitle(updatedCourse.getTitle());
            course.setDescription(updatedCourse.getDescription());
            course.setPrerequisites(updatedCourse.getPrerequisites()); // <-- added this line
            return courseRepository.save(course);
        }
        return null;
    }

    @Override
    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }

    @Override
    public Course getCourseByCourseId(String courseId) {
        return courseRepository.findByCourseId(courseId).orElse(null);
    }

    @Override
    public void deleteCourseByCourseId(String courseId) {
        courseRepository.deleteByCourseId(courseId);
    }

    @Override
    public boolean isPrerequisite(String courseId) {
        return courseRepository.existsByPrerequisitesContains(courseId);
    }
}
