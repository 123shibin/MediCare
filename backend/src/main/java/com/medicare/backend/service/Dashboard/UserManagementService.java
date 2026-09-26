package com.medicare.backend.service.Dashboard;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medicare.backend.dto.userdto.UserManagementRequest;
import com.medicare.backend.models.Authentication.User;
import com.medicare.backend.models.dashboard.UserManagement;
import com.medicare.backend.repository.Authentication.UserRepository;
import com.medicare.backend.repository.Dashboard.UserManagementRepository;
import com.medicare.backend.security.TemporaryPasswordGenerator;

@Service
public class UserManagementService {

    private final UserManagementRepository userManagementRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TemporaryPasswordGenerator passwordGenerator;

    public UserManagementService(
            UserManagementRepository userManagementRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            TemporaryPasswordGenerator passwordGenerator) {

        this.userManagementRepository = userManagementRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordGenerator = passwordGenerator;
    }

    @Transactional
    public String createStaff(UserManagementRequest request) {

        // Check whether email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException(
                "An account with this email already exists"
            );
        }

        if (userManagementRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                "A staff member with this email already exists"
            );
        }

        // Generate temporary password
        String temporaryPassword =
                passwordGenerator.generate();

        // -----------------------------
        // Save authentication account
        // -----------------------------

        User user = new User();

        user.setEmail(request.getEmail());
        user.setFullname(request.getName());

        // Store ONLY encrypted password
        user.setPassword(
            passwordEncoder.encode(temporaryPassword)
        );

        user.setAccountType("STAFF");

        // Force password change on first login
        user.setMustChangePassword(true);

        userRepository.save(user);


        // -----------------------------
        // Save staff management record
        // -----------------------------

        UserManagement staff = new UserManagement();

        staff.setName(request.getName());
        staff.setEmail(request.getEmail());
        staff.setRole(request.getRole());
        staff.setStatus(request.getStatus());
        staff.setPatients(0);

        userManagementRepository.save(staff);


        // Return temporary password
        // In production this should be sent by email.
        return temporaryPassword;
    }
}