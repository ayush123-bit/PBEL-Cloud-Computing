package com.iitb.courses.courses_api.repository;

import com.iitb.courses.courses_api.model.CourseInstance;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CourseInstanceRepository extends MongoRepository<CourseInstance, String> {
    List<CourseInstance> findByYearAndSemester(int year, int semester);
    List<CourseInstance> findByCourseId(String courseId);
    CourseInstance findByCourseIdAndYearAndSemester(String courseId, int year, int semester);
    void deleteByCourseIdAndYearAndSemester(String courseId, int year, int semester);
}
