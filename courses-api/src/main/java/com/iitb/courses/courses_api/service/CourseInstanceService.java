package com.iitb.courses.courses_api.service;

import com.iitb.courses.courses_api.model.CourseInstance;
import java.util.List;

public interface CourseInstanceService {
    CourseInstance createInstance(CourseInstance instance);
    List<CourseInstance> getInstancesByYearAndSemester(int year, int semester);
    CourseInstance getInstanceByCourseIdAndYearSemester(String courseId, int year, int semester);
    void deleteInstance(String courseId, int year, int semester);
}
