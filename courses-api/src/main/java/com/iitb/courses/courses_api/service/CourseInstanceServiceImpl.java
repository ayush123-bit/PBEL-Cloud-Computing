package com.iitb.courses.courses_api.service;

import com.iitb.courses.courses_api.model.CourseInstance;
import com.iitb.courses.courses_api.repository.CourseInstanceRepository;
import com.iitb.courses.courses_api.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseInstanceServiceImpl implements CourseInstanceService {

    private final CourseInstanceRepository instanceRepository;
    private final CourseRepository courseRepository;

    @Override
    public CourseInstance createInstance(CourseInstance instance) {
        return instanceRepository.save(instance);
    }

    @Override
    public List<CourseInstance> getInstancesByYearAndSemester(int year, int semester) {
        return instanceRepository.findByYearAndSemester(year, semester);
    }

    @Override
    public CourseInstance getInstanceByCourseIdAndYearSemester(String courseId, int year, int semester) {
        return instanceRepository.findByCourseIdAndYearAndSemester(courseId, year, semester);
    }

    @Override
    public void deleteInstance(String courseId, int year, int semester) {
        // Check if the course is a prerequisite in any course
        boolean isPrerequisite = courseRepository.findAll().stream()
                .anyMatch(course -> course.getPrerequisites() != null &&
                        course.getPrerequisites().contains(courseId));

        if (isPrerequisite) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Cannot delete instance. Course is a prerequisite for another course."
            );
        }

        // Proceed with deletion if no dependency
        CourseInstance instance = instanceRepository.findByCourseIdAndYearAndSemester(courseId, year, semester);
        if (instance != null) {
            instanceRepository.delete(instance);
        } else {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Instance not found for deletion."
            );
        }
    }
}
