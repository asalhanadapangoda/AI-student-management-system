package com.sms.degreeprogram.repository;

import com.sms.degreeprogram.entity.DegreeProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegreeProgramRepository extends JpaRepository<DegreeProgram, Long> {
}
