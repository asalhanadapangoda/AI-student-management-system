package com.sms.degreeprogram.controller;

import com.sms.degreeprogram.entity.DegreeProgram;
import com.sms.degreeprogram.service.DegreeProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/degree-programs")
@RequiredArgsConstructor
public class DegreeProgramController {

    private final DegreeProgramService degreeProgramService;

    @GetMapping
    public ResponseEntity<List<DegreeProgram>> getAllDegreePrograms() {
        return ResponseEntity.ok(degreeProgramService.getAllDegreePrograms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DegreeProgram> getDegreeProgramById(@PathVariable Long id) {
        return degreeProgramService.getDegreeProgramById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DegreeProgram> createDegreeProgram(@RequestBody DegreeProgram degreeProgram) {
        return ResponseEntity.ok(degreeProgramService.saveDegreeProgram(degreeProgram));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDegreeProgram(@PathVariable Long id) {
        degreeProgramService.deleteDegreeProgram(id);
        return ResponseEntity.noContent().build();
    }
}
