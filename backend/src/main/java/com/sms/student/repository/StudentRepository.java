package com.sms.student.repository;

import com.sms.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByStudentNumber(String studentNumber);
    Optional<Student> findTopByStudentNumberStartingWithOrderByStudentNumberDesc(String prefix);
}
