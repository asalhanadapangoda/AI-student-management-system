package com.sms.enrollment.controller;

import com.sms.enrollment.dto.EnrollmentDTO;
import com.sms.enrollment.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final com.sms.audit.service.AuditLogService auditLogService;

    @PostMapping
    public ResponseEntity<EnrollmentDTO> createEnrollment(@Valid @RequestBody EnrollmentDTO dto) {
        EnrollmentDTO created = enrollmentService.createEnrollment(dto);
        auditLogService.logAction("CREATE_ENROLLMENT", "Enrollment", created.getEnrollmentId(), null, "Student ID: " + created.getStudentId() + ", Offering ID: " + created.getCourseOfferingId());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentDTO>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentDTO> updateEnrollment(@PathVariable Long id, @Valid @RequestBody EnrollmentDTO dto) {
        EnrollmentDTO updated = enrollmentService.updateEnrollment(id, dto);
        auditLogService.logAction("UPDATE_ENROLLMENT", "Enrollment", id, null, "Updated status: " + updated.getStatus());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
        auditLogService.logAction("DELETE_ENROLLMENT", "Enrollment", id, null, null);
        return ResponseEntity.noContent().build();
    }
}
