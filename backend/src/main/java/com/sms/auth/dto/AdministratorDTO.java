package com.sms.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdministratorDTO {
    private Long adminId;
    private String name;
    private String email;
    private String role;
}
