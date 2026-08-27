package com.sms.semester.controller;

import com.sms.semester.dto.AcademicYearDTO;
import com.sms.semester.service.AcademicYearService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic-years")
@RequiredArgsConstructor
public class AcademicYearController {

    private final AcademicYearService academicYearService;

    @PostMapping
    public ResponseEntity<AcademicYearDTO> createAcademicYear(@Valid @RequestBody AcademicYearDTO dto) {
        AcademicYearDTO created = academicYearService.createAcademicYear(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AcademicYearDTO>> getAllAcademicYears() {
        return ResponseEntity.ok(academicYearService.getAllAcademicYears());
    }
}
