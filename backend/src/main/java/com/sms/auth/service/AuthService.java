package com.sms.auth.service;

import com.sms.auth.dto.AuthRequestDTO;
import com.sms.auth.dto.AuthResponseDTO;
import com.sms.auth.entity.Administrator;
import com.sms.auth.repository.AdministratorRepository;
import com.sms.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdministratorRepository administratorRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDTO login(AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        Administrator admin = administratorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                
        String jwtToken = jwtService.generateToken(admin);
        
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .adminId(admin.getAdminId())
                .name(admin.getName())
                .role(admin.getRole())
                .build();
    }
}
