package com.sms.degreeprogram.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DegreeProgramDTO {
    private Long id;
    private String title;
    private String department;
}
