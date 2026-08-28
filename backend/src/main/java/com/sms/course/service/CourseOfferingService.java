package com.sms.course.service;

import com.sms.course.dto.CourseOfferingDTO;
import com.sms.course.entity.Course;
import com.sms.course.entity.CourseOffering;
import com.sms.course.repository.CourseOfferingRepository;
import com.sms.course.repository.CourseRepository;
import com.sms.semester.entity.Semester;
import com.sms.semester.repository.SemesterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseOfferingService {

    private final CourseOfferingRepository courseOfferingRepository;
    private final CourseRepository courseRepository;
    private final SemesterRepository semesterRepository;

    public CourseOfferingDTO createCourseOffering(CourseOfferingDTO dto) {
        Course course = null;
        if (dto.getCourseId() != null) {
            course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        }

        Semester semester = null;
        if (dto.getSemesterId() != null) {
            semester = semesterRepository.findById(dto.getSemesterId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Semester not found"));
        }

        CourseOffering entity = CourseOffering.builder()
                .course(course)
                .semester(semester)
                .build();

        CourseOffering saved = courseOfferingRepository.save(entity);
        return mapToDTO(saved);
    }

    public List<CourseOfferingDTO> getAllCourseOfferings() {
        return courseOfferingRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private CourseOfferingDTO mapToDTO(CourseOffering entity) {
        return CourseOfferingDTO.builder()
                .courseOfferingId(entity.getCourseOfferingId())
                .courseId(entity.getCourse() != null ? entity.getCourse().getCourseId() : null)
                .semesterId(entity.getSemester() != null ? entity.getSemester().getSemesterId() : null)
                .courseCode(entity.getCourse() != null ? entity.getCourse().getCourseCode() : null)
                .courseName(entity.getCourse() != null ? entity.getCourse().getCourseName() : null)
                .semesterName(entity.getSemester() != null ? entity.getSemester().getName() : null)
                .build();
    }
}
