package com.sms.degreeprogram.entity;

import com.sms.common.entity.BaseEntity;
import com.sms.student.entity.Student;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import java.util.ArrayList;

@Entity
@Table(name = "degree_programs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE degree_programs SET is_active = false WHERE degree_program_id=?")
@SQLRestriction("is_active = true")
public class DegreeProgram extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "degree_program_id")
    private Long degreeProgramId;

    @Column(name = "program_code", unique = true, nullable = false)
    private String programCode;

    @Column(name = "program_name", nullable = false)
    private String programName;

    @Column(name = "department")
    private String department;

    @Column(name = "duration_years")
    private Integer durationYears;

    @Builder.Default
    @OneToMany(mappedBy = "degreeProgram", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Student> students = new ArrayList<>();
}
