package com.sms.dashboard.service;

import com.sms.course.repository.CourseRepository;
import com.sms.dashboard.dto.DashboardStatsDTO;
import com.sms.semester.repository.SemesterRepository;
import com.sms.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final SemesterRepository semesterRepository;

    public DashboardStatsDTO getStats() {
        long studentCount = studentRepository.count();
        long courseCount = courseRepository.count();
        
        // In a real app, you would fetch the current active semester based on date
        String currentSemester = "Fall 2026";
        
        return DashboardStatsDTO.builder()
                .totalStudents(studentCount)
                .activeStudents(studentCount) // Since @SQLRestriction filters out inactive
                .totalCourses(courseCount)
                .currentSemester(currentSemester)
                .build();
    }
}
