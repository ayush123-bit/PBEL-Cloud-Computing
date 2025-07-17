package com.iitb.courses.courses_api.service;

import com.iitb.courses.courses_api.model.Course;
import java.util.List;

public interface CourseService {
    Course createCourse(Course course);
    Course getCourseById(String id);
    List<Course> getAllCourses();
    Course updateCourse(String id, Course course);
    void deleteCourse(String id);
    Course getCourseByCourseId(String courseId);
    void deleteCourseByCourseId(String courseId);
    boolean isPrerequisite(String courseId);

}
