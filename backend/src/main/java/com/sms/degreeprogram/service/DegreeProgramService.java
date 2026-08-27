package com.sms.degreeprogram.service;

import com.sms.degreeprogram.dto.DegreeProgramDTO;
import com.sms.degreeprogram.entity.DegreeProgram;
import com.sms.degreeprogram.repository.DegreeProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DegreeProgramService {

    private final DegreeProgramRepository degreeProgramRepository;

    public DegreeProgramDTO createDegreeProgram(DegreeProgramDTO dto) {
        DegreeProgram entity = mapToEntity(dto);
        DegreeProgram savedEntity = degreeProgramRepository.save(entity);
        return mapToDTO(savedEntity);
    }

    public List<DegreeProgramDTO> getAllDegreePrograms() {
        return degreeProgramRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public DegreeProgramDTO getDegreeProgramById(Long id) {
        DegreeProgram entity = degreeProgramRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Degree Program not found"));
        return mapToDTO(entity);
    }

    public DegreeProgramDTO updateDegreeProgram(Long id, DegreeProgramDTO dto) {
        DegreeProgram existing = degreeProgramRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Degree Program not found"));
        
        existing.setProgramCode(dto.getProgramCode());
        existing.setProgramName(dto.getProgramName());
        existing.setDepartment(dto.getDepartment());
        existing.setDurationYears(dto.getDurationYears());

        DegreeProgram updated = degreeProgramRepository.save(existing);
        return mapToDTO(updated);
    }

    public void deleteDegreeProgram(Long id) {
        if (!degreeProgramRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Degree Program not found");
        }
        degreeProgramRepository.deleteById(id);
    }

    // Mapping Helpers
    private DegreeProgramDTO mapToDTO(DegreeProgram entity) {
        return DegreeProgramDTO.builder()
                .degreeProgramId(entity.getDegreeProgramId())
                .programCode(entity.getProgramCode())
                .programName(entity.getProgramName())
                .department(entity.getDepartment())
                .durationYears(entity.getDurationYears())
                .build();
    }

    private DegreeProgram mapToEntity(DegreeProgramDTO dto) {
        return DegreeProgram.builder()
                .programCode(dto.getProgramCode())
                .programName(dto.getProgramName())
                .department(dto.getDepartment())
                .durationYears(dto.getDurationYears())
                .build();
    }
}
