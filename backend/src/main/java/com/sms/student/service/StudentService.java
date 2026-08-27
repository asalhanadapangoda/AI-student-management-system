package com.sms.student.service;

import com.sms.degreeprogram.entity.DegreeProgram;
import com.sms.degreeprogram.repository.DegreeProgramRepository;
import com.sms.student.dto.StudentAddressDTO;
import com.sms.student.dto.StudentDTO;
import com.sms.student.entity.Student;
import com.sms.student.entity.StudentAddress;
import com.sms.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final DegreeProgramRepository degreeProgramRepository;

    public StudentDTO createStudent(StudentDTO dto) {
        Student entity = mapToEntity(dto);
        
        // Auto-generate student number (e.g. SE20260001)
        String yearStr = String.valueOf(java.time.Year.now().getValue());
        String programCode = entity.getDegreeProgram() != null ? entity.getDegreeProgram().getProgramCode() : "GEN";
        String prefix = programCode + yearStr;
        
        String lastStudentNumber = studentRepository.findTopByStudentNumberStartingWithOrderByStudentNumberDesc(prefix)
                .map(Student::getStudentNumber)
                .orElse(prefix + "0000");
        
        int nextSequence = Integer.parseInt(lastStudentNumber.substring(prefix.length())) + 1;
        String newStudentNumber = prefix + String.format("%04d", nextSequence);
        entity.setStudentNumber(newStudentNumber);
        
        if (dto.getAddresses() != null) {
            List<StudentAddress> addresses = dto.getAddresses().stream()
                    .map(a -> mapAddressToEntity(a, entity))
                    .collect(Collectors.toList());
            entity.setAddresses(addresses);
        }

        Student saved = studentRepository.save(entity);
        return mapToDTO(saved);
    }

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO getStudentById(Long id) {
        Student entity = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        return mapToDTO(entity);
    }

    public StudentDTO getStudentByNumber(String studentNumber) {
        Student entity = studentRepository.findByStudentNumber(studentNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        return mapToDTO(entity);
    }

    public StudentDTO updateStudent(Long id, StudentDTO dto) {
        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        existing.setStudentNumber(dto.getStudentNumber());
        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setDateOfBirth(dto.getDateOfBirth());
        existing.setEmail(dto.getEmail());
        existing.setPhone(dto.getPhone());

        if (dto.getDegreeProgramId() != null) {
            DegreeProgram degreeProgram = degreeProgramRepository.findById(dto.getDegreeProgramId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Degree Program not found"));
            existing.setDegreeProgram(degreeProgram);
        } else {
            existing.setDegreeProgram(null);
        }

        Student updated = studentRepository.save(existing);
        return mapToDTO(updated);
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found");
        }
        studentRepository.deleteById(id);
    }

    // Mappers
    private StudentDTO mapToDTO(Student entity) {
        return StudentDTO.builder()
                .studentId(entity.getStudentId())
                .studentNumber(entity.getStudentNumber())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .dateOfBirth(entity.getDateOfBirth())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .degreeProgramId(entity.getDegreeProgram() != null ? entity.getDegreeProgram().getDegreeProgramId() : null)
                .addresses(entity.getAddresses() != null ? entity.getAddresses().stream().map(this::mapAddressToDTO).collect(Collectors.toList()) : null)
                .build();
    }

    private Student mapToEntity(StudentDTO dto) {
        DegreeProgram degreeProgram = null;
        if (dto.getDegreeProgramId() != null) {
            degreeProgram = degreeProgramRepository.findById(dto.getDegreeProgramId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Degree Program not found"));
        }

        return Student.builder()
                .studentNumber(dto.getStudentNumber())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .dateOfBirth(dto.getDateOfBirth())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .degreeProgram(degreeProgram)
                .build();
    }

    private StudentAddressDTO mapAddressToDTO(StudentAddress entity) {
        return StudentAddressDTO.builder()
                .addressId(entity.getAddressId())
                .addressLine1(entity.getAddressLine1())
                .addressLine2(entity.getAddressLine2())
                .city(entity.getCity())
                .district(entity.getDistrict())
                .postalCode(entity.getPostalCode())
                .isCurrent(entity.getIsCurrent())
                .build();
    }

    private StudentAddress mapAddressToEntity(StudentAddressDTO dto, Student student) {
        return StudentAddress.builder()
                .student(student)
                .addressLine1(dto.getAddressLine1())
                .addressLine2(dto.getAddressLine2())
                .city(dto.getCity())
                .district(dto.getDistrict())
                .postalCode(dto.getPostalCode())
                .isCurrent(dto.getIsCurrent() != null ? dto.getIsCurrent() : true)
                .build();
    }
}
