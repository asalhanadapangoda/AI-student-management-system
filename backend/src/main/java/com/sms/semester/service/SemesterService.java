package com.sms.semester.service;

import com.sms.semester.dto.SemesterDTO;
import com.sms.semester.entity.AcademicYear;
import com.sms.semester.entity.Semester;
import com.sms.semester.repository.AcademicYearRepository;
import com.sms.semester.repository.SemesterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SemesterService {

    private final SemesterRepository semesterRepository;
    private final AcademicYearRepository academicYearRepository;

    public SemesterDTO createSemester(SemesterDTO dto) {
        AcademicYear academicYear = null;
        if (dto.getAcademicYearId() != null) {
            academicYear = academicYearRepository.findById(dto.getAcademicYearId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Academic Year not found"));
        }

        Semester entity = Semester.builder()
                .academicYear(academicYear)
                .semesterNumber(dto.getSemesterNumber())
                .name(dto.getName())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();

        Semester saved = semesterRepository.save(entity);
        return mapToDTO(saved);
    }

    public List<SemesterDTO> getAllSemesters() {
        return semesterRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private SemesterDTO mapToDTO(Semester entity) {
        return SemesterDTO.builder()
                .semesterId(entity.getSemesterId())
                .academicYearId(entity.getAcademicYear() != null ? entity.getAcademicYear().getAcademicYearId() : null)
                .semesterNumber(entity.getSemesterNumber())
                .name(entity.getName())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .build();
    }
}
