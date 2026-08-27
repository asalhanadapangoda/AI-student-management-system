package com.sms.degreeprogram.service;

import com.sms.degreeprogram.entity.DegreeProgram;
import com.sms.degreeprogram.repository.DegreeProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DegreeProgramService {

    private final DegreeProgramRepository degreeProgramRepository;

    public List<DegreeProgram> getAllDegreePrograms() {
        return degreeProgramRepository.findAll();
    }

    public Optional<DegreeProgram> getDegreeProgramById(Long id) {
        return degreeProgramRepository.findById(id);
    }

    public DegreeProgram saveDegreeProgram(DegreeProgram degreeProgram) {
        return degreeProgramRepository.save(degreeProgram);
    }

    public void deleteDegreeProgram(Long id) {
        degreeProgramRepository.deleteById(id);
    }
}
