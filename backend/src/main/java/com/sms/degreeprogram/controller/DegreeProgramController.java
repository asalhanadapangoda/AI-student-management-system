package com.sms.degreeprogram.controller;

import com.sms.degreeprogram.dto.DegreeProgramDTO;
import com.sms.degreeprogram.service.DegreeProgramService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/degree-programs")
@RequiredArgsConstructor
public class DegreeProgramController {

    private final DegreeProgramService degreeProgramService;

    @PostMapping
    public ResponseEntity<DegreeProgramDTO> createDegreeProgram(@Valid @RequestBody DegreeProgramDTO dto) {
        DegreeProgramDTO created = degreeProgramService.createDegreeProgram(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DegreeProgramDTO>> getAllDegreePrograms() {
        return ResponseEntity.ok(degreeProgramService.getAllDegreePrograms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DegreeProgramDTO> getDegreeProgramById(@PathVariable Long id) {
        return ResponseEntity.ok(degreeProgramService.getDegreeProgramById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DegreeProgramDTO> updateDegreeProgram(@PathVariable Long id, @Valid @RequestBody DegreeProgramDTO dto) {
        return ResponseEntity.ok(degreeProgramService.updateDegreeProgram(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDegreeProgram(@PathVariable Long id) {
        degreeProgramService.deleteDegreeProgram(id);
        return ResponseEntity.noContent().build();
    }
}
