package com.medicare.backend.service.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.medicare.backend.dto.Authdto.LoginRequest;
import com.medicare.backend.dto.Authdto.RegisterRequest;
import com.medicare.backend.models.Authentication.User;
import com.medicare.backend.repository.Authentication.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public void register(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullname(request.getFullname());
        user.setPassword(encoder.encode(request.getPassword()));
        repo.save(user);
    }

    public String login(LoginRequest request) {
        User user = repo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Here you would generate a JWT token and return it
        // For simplicity, we'll just return a placeholder string
        return "JWT_TOKEN_PLACEHOLDER";
    }
}