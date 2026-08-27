package com.sms.enrollment.service;

import com.sms.course.entity.CourseOffering;
import com.sms.course.repository.CourseOfferingRepository;
import com.sms.enrollment.dto.EnrollmentDTO;
import com.sms.enrollment.entity.Enrollment;
import com.sms.enrollment.repository.EnrollmentRepository;
import com.sms.student.entity.Student;
import com.sms.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseOfferingRepository courseOfferingRepository;

    public EnrollmentDTO createEnrollment(EnrollmentDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        CourseOffering courseOffering = courseOfferingRepository.findById(dto.getCourseOfferingId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course Offering not found"));

        Enrollment entity = Enrollment.builder()
                .student(student)
                .courseOffering(courseOffering)
                .status(dto.getStatus() != null ? dto.getStatus() : "ENROLLED")
                .enrolledAt(dto.getEnrolledAt() != null ? dto.getEnrolledAt() : LocalDateTime.now())
                .grade(dto.getGrade())
                .completedAt(dto.getCompletedAt())
                .build();

        Enrollment saved = enrollmentRepository.save(entity);
        return mapToDTO(saved);
    }

    public List<EnrollmentDTO> getEnrollmentsByStudentId(Long studentId) {
        return enrollmentRepository.findByStudent_StudentId(studentId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public EnrollmentDTO updateEnrollment(Long id, EnrollmentDTO dto) {
        Enrollment existing = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Enrollment not found"));

        if (dto.getStatus() != null) existing.setStatus(dto.getStatus());
        if (dto.getGrade() != null) existing.setGrade(dto.getGrade());
        if (dto.getCompletedAt() != null) existing.setCompletedAt(dto.getCompletedAt());

        Enrollment updated = enrollmentRepository.save(existing);
        return mapToDTO(updated);
    }

    public void deleteEnrollment(Long id) {
        if (!enrollmentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Enrollment not found");
        }
        enrollmentRepository.deleteById(id);
    }

    public EnrollmentDTO mapToDTO(Enrollment entity) {
        return EnrollmentDTO.builder()
                .enrollmentId(entity.getEnrollmentId())
                .studentId(entity.getStudent() != null ? entity.getStudent().getStudentId() : null)
                .courseOfferingId(entity.getCourseOffering() != null ? entity.getCourseOffering().getCourseOfferingId() : null)
                .status(entity.getStatus())
                .enrolledAt(entity.getEnrolledAt())
                .completedAt(entity.getCompletedAt())
                .grade(entity.getGrade())
                .build();
    }
}
