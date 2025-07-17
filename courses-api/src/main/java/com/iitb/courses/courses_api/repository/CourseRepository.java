package com.iitb.courses.courses_api.repository;

import com.iitb.courses.courses_api.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CourseRepository extends MongoRepository<Course, String> {

    Optional<Course> findByCourseId(String courseId);   // ✅ for fetching by courseId

    boolean existsByCourseId(String courseId);          // ✅ optional for validation or delete checks

    void deleteByCourseId(String courseId);

    boolean existsByPrerequisitesContains(String courseId);
}
