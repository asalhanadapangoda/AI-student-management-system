package com.sms.enrollment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentDTO {
    private Long enrollmentId;

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Course Offering ID is required")
    private Long courseOfferingId;
    
    private String status;
    private LocalDateTime enrolledAt;
    private LocalDateTime completedAt;
    private String grade;
}
