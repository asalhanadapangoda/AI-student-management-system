package com.sms.course.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDTO {
    private Long courseId;
    
    @NotBlank(message = "Course code is required")
    private String courseCode;
    
    @NotBlank(message = "Course name is required")
    private String courseName;
    
    @NotNull(message = "Credits are required")
    private Integer credits;
    
    private Long degreeProgramId;
}
