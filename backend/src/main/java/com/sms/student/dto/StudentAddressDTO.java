package com.sms.student.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentAddressDTO {
    private Long addressId;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String district;
    private String postalCode;
    private Boolean isCurrent;
}
