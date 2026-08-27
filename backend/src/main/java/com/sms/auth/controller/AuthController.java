package com.sms.auth.controller;

import com.sms.auth.dto.AuthRequestDTO;
import com.sms.auth.dto.AuthResponseDTO;
import com.sms.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Since JWT is stateless, logout is typically handled on the client-side
        // by deleting the token. We can just return a success message.
        return ResponseEntity.ok("Successfully logged out (token should be deleted on client side)");
    }
}
