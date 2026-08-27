package com.sms.semester.controller;

import com.sms.semester.dto.SemesterDTO;
import com.sms.semester.service.SemesterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semesters")
@RequiredArgsConstructor
public class SemesterController {

    private final SemesterService semesterService;

    @PostMapping
    public ResponseEntity<SemesterDTO> createSemester(@Valid @RequestBody SemesterDTO dto) {
        SemesterDTO created = semesterService.createSemester(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SemesterDTO>> getAllSemesters() {
        return ResponseEntity.ok(semesterService.getAllSemesters());
    }
}
