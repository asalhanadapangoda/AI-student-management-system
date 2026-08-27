package com.sms.semester.service;

import com.sms.semester.dto.AcademicYearDTO;
import com.sms.semester.entity.AcademicYear;
import com.sms.semester.repository.AcademicYearRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AcademicYearService {

    private final AcademicYearRepository academicYearRepository;

    public AcademicYearDTO createAcademicYear(AcademicYearDTO dto) {
        AcademicYear entity = AcademicYear.builder()
                .yearLabel(dto.getYearLabel())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();
        AcademicYear saved = academicYearRepository.save(entity);
        return mapToDTO(saved);
    }

    public List<AcademicYearDTO> getAllAcademicYears() {
        return academicYearRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AcademicYearDTO mapToDTO(AcademicYear entity) {
        return AcademicYearDTO.builder()
                .academicYearId(entity.getAcademicYearId())
                .yearLabel(entity.getYearLabel())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .build();
    }
}
