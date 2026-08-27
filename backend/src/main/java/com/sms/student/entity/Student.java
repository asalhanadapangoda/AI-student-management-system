package com.sms.student.entity;

import com.sms.common.entity.BaseEntity;
import com.sms.degreeprogram.entity.DegreeProgram;
import com.sms.enrollment.entity.Enrollment;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import java.util.ArrayList;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE students SET is_active = false WHERE student_id=?")
@SQLRestriction("is_active = true")
public class Student extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "student_number", unique = true, nullable = false)
    private String studentNumber;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "degree_program_id")
    private DegreeProgram degreeProgram;

    @Builder.Default
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudentAddress> addresses = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Enrollment> enrollments = new ArrayList<>();
}
