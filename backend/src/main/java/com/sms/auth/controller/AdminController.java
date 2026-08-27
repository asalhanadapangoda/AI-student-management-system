package com.sms.auth.controller;

import com.sms.auth.dto.AdministratorDTO;
import com.sms.auth.entity.Administrator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/profile")
    public ResponseEntity<AdministratorDTO> getProfile(@AuthenticationPrincipal Administrator admin) {
        AdministratorDTO dto = AdministratorDTO.builder()
                .adminId(admin.getAdminId())
                .name(admin.getName())
                .email(admin.getEmail())
                .role(admin.getRole())
                .build();
        return ResponseEntity.ok(dto);
    }
}
