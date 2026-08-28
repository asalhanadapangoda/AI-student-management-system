package com.sms.audit.service;

import com.sms.audit.dto.AuditLogDTO;
import com.sms.audit.entity.AuditLog;
import com.sms.audit.repository.AuditLogRepository;
import com.sms.auth.entity.Administrator;
import com.sms.auth.repository.AdministratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AdministratorRepository adminRepository;

    public void logActionWithEmail(String email, String action, String entityType, Long entityId, String oldValue, String newValue) {
        try {
            adminRepository.findByEmail(email).ifPresent(admin -> {
                AuditLog log = AuditLog.builder()
                        .admin(admin)
                        .action(action)
                        .entityType(entityType)
                        .entityId(entityId)
                        .oldValue(oldValue)
                        .newValue(newValue)
                        .build();
                auditLogRepository.save(log);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void logAction(String action, String entityType, Long entityId, String oldValue, String newValue) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String email = authentication.getName();
                logActionWithEmail(email, action, entityType, entityId, oldValue, newValue);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<AuditLogDTO> getRecentLogs() {
        return auditLogRepository.findTop50ByOrderByCreatedAtDesc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AuditLogDTO mapToDTO(AuditLog log) {
        return AuditLogDTO.builder()
                .auditLogId(log.getAuditLogId())
                .adminEmail(log.getAdmin().getEmail())
                .adminName(log.getAdmin().getName())
                .action(log.getAction())
                .entityType(log.getEntityType())
                .entityId(log.getEntityId())
                .oldValue(log.getOldValue())
                .newValue(log.getNewValue())
                .ipAddress(log.getIpAddress())
                .createdAt(log.getCreatedAt())
                .build();
    }
}
