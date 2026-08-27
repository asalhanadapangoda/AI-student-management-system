package com.sms.auth.service;

import com.sms.auth.entity.User;
import com.sms.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User registerUser(User user) {
        // TODO: Password encoding logic to be added
        return userRepository.save(user);
    }
}
