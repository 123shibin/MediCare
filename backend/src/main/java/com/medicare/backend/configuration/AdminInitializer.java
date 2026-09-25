package com.medicare.backend.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.medicare.backend.models.Authentication.User;
import com.medicare.backend.repository.Authentication.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {

        if (!userRepository.existsByEmail(adminEmail)) {

            User admin = new User();

            admin.setEmail(adminEmail);
            admin.setFullname("Hospital Administrator");

            admin.setPassword(
                passwordEncoder.encode(adminPassword)
            );

            admin.setAccountType("ADMIN");

            userRepository.save(admin);

            System.out.println("=================================");
            System.out.println("Initial admin account created");
            System.out.println("Email: " + adminEmail);
            System.out.println("=================================");
        }
    }
}