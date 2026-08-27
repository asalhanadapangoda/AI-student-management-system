package com.sms.course.service;

import com.sms.course.dto.CourseDTO;
import com.sms.course.entity.Course;
import com.sms.course.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseDTO createCourse(CourseDTO dto) {
        Course entity = mapToEntity(dto);
        Course saved = courseRepository.save(entity);
        return mapToDTO(saved);
    }

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO getCourseById(Long id) {
        Course entity = courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        return mapToDTO(entity);
    }

    public CourseDTO updateCourse(Long id, CourseDTO dto) {
        Course existing = courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        
        existing.setCourseCode(dto.getCourseCode());
        existing.setCourseName(dto.getCourseName());
        existing.setCredits(dto.getCredits());
        existing.setDescription(dto.getDescription());

        Course updated = courseRepository.save(existing);
        return mapToDTO(updated);
    }

    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found");
        }
        courseRepository.deleteById(id);
    }

    // Mapping Helpers
    private CourseDTO mapToDTO(Course entity) {
        return CourseDTO.builder()
                .courseId(entity.getCourseId())
                .courseCode(entity.getCourseCode())
                .courseName(entity.getCourseName())
                .credits(entity.getCredits())
                .description(entity.getDescription())
                .build();
    }

    private Course mapToEntity(CourseDTO dto) {
        return Course.builder()
                .courseCode(dto.getCourseCode())
                .courseName(dto.getCourseName())
                .credits(dto.getCredits())
                .description(dto.getDescription())
                .build();
    }
}
