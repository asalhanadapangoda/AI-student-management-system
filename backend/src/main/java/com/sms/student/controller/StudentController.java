package com.sms.student.controller;

import com.sms.enrollment.dto.EnrollmentDTO;
import com.sms.enrollment.service.EnrollmentService;
import com.sms.student.dto.StudentDTO;
import com.sms.student.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final EnrollmentService enrollmentService;
    private final com.sms.audit.service.AuditLogService auditLogService;

    @GetMapping("/{id}/enrollments")
    public ResponseEntity<List<EnrollmentDTO>> getStudentEnrollments(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudentId(id));
    }

    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody StudentDTO dto) {
        StudentDTO created = studentService.createStudent(dto);
        auditLogService.logAction("CREATE_STUDENT", "Student", created.getStudentId(), null, created.getStudentNumber());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @GetMapping("/number/{studentNumber}")
    public ResponseEntity<StudentDTO> getStudentByNumber(@PathVariable String studentNumber) {
        return ResponseEntity.ok(studentService.getStudentByNumber(studentNumber));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @Valid @RequestBody StudentDTO dto) {
        StudentDTO updated = studentService.updateStudent(id, dto);
        auditLogService.logAction("UPDATE_STUDENT", "Student", id, null, updated.getStudentNumber());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        auditLogService.logAction("DELETE_STUDENT", "Student", id, null, null);
        return ResponseEntity.noContent().build();
    }
}
