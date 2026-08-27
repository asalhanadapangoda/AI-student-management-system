package com.sms.common.exception;

import com.sms.common.dto.ErrorResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponseDTO> handleResponseStatusException(ResponseStatusException ex, HttpServletRequest request) {
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .success(false)
                .message(ex.getReason())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, ex.getStatusCode());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponseDTO> handleDataIntegrityViolationException(DataIntegrityViolationException ex, HttpServletRequest request) {
        // Handle 409 Conflict (e.g., unique constraint violations)
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .success(false)
                .message("Data conflict or constraint violation occurred (e.g., duplicate record)")
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
        // Handle 400 Bad Request
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .success(false)
                .message("Validation failed for one or more fields")
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponseDTO> handleAuthenticationException(AuthenticationException ex, HttpServletRequest request) {
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .success(false)
                .message("Unauthorized: Missing or invalid authentication token")
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDTO> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .success(false)
                .message("Forbidden: You do not have permission to access this resource")
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    // Generic 500 Internal Server Error Handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleAllExceptions(Exception ex, HttpServletRequest request) {
        // In a real application, you might want to log 'ex' for debugging
        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .success(false)
                .message("An unexpected internal server error occurred")
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
