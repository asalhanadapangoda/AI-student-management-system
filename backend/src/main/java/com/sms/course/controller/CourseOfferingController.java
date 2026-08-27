package com.sms.course.controller;

import com.sms.course.dto.CourseOfferingDTO;
import com.sms.course.service.CourseOfferingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-offerings")
@RequiredArgsConstructor
public class CourseOfferingController {

    private final CourseOfferingService courseOfferingService;

    @PostMapping
    public ResponseEntity<CourseOfferingDTO> createCourseOffering(@Valid @RequestBody CourseOfferingDTO dto) {
        CourseOfferingDTO created = courseOfferingService.createCourseOffering(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CourseOfferingDTO>> getAllCourseOfferings() {
        return ResponseEntity.ok(courseOfferingService.getAllCourseOfferings());
    }
}
