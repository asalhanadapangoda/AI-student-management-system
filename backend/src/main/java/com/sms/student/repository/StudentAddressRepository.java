package com.sms.student.repository;

import com.sms.student.entity.StudentAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentAddressRepository extends JpaRepository<StudentAddress, Long> {
}
