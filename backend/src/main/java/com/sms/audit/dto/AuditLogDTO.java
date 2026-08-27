package com.sms.audit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLogDTO {
    private Long auditLogId;
    private Long adminId;
    private String action;
    private String entityType;
    private Long entityId;
    private String oldValue;
    private String newValue;
}
