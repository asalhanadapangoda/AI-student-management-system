package com.sms.degreeprogram.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DegreeProgramDTO {
    private Long degreeProgramId;
    
    @NotBlank(message = "Program code is required")
    private String programCode;
    
    @NotBlank(message = "Program name is required")
    private String programName;
    
    @NotBlank(message = "Department is required")
    private String department;
    
    @NotNull(message = "Duration years is required")
    @Min(value = 1, message = "Duration must be at least 1 year")
    private Integer durationYears;
}
