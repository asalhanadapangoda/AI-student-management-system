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

    @GetMapping("/{id}/enrollments")
    public ResponseEntity<List<EnrollmentDTO>> getStudentEnrollments(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudentId(id));
    }

    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody StudentDTO dto) {
        StudentDTO created = studentService.createStudent(dto);
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
        return ResponseEntity.ok(studentService.updateStudent(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
