package com.iitb.courses.courses_api.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "course_instances")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseInstance {
    @Id
    private String id;

    private String courseId; 
    private int year;
    private int semester;
}
