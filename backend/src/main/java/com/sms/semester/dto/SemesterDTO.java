package com.sms.semester.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SemesterDTO {
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
}
