package com.medicare.backend.service.Dashboard;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medicare.backend.dto.userdto.UserManagementRequest;
import com.medicare.backend.dto.userdto.UserManagementResponse;
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


    // ======================================================
    // CREATE STAFF
    // ======================================================

    @Transactional
    public String createStaff(
            UserManagementRequest request) {


        // ----------------------------------------------
        // Check admin users table
        // ----------------------------------------------

        if (userRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                "An account with this email already exists"
            );
        }


        // ----------------------------------------------
        // Check staff table
        // ----------------------------------------------

        if (userManagementRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                "A staff member with this email already exists"
            );
        }


        // ----------------------------------------------
        // Generate temporary password
        // ----------------------------------------------

        String temporaryPassword =
                passwordGenerator.generate();


        // ----------------------------------------------
        // Create staff
        // ----------------------------------------------

        UserManagement staff =
                new UserManagement();

        staff.setName(request.getName());
        staff.setEmail(request.getEmail());
        staff.setRole(request.getRole());
        staff.setStatus(request.getStatus());
        staff.setPatients(0);


        // ----------------------------------------------
        // Encrypt password
        // ----------------------------------------------

        staff.setPassword(
            passwordEncoder.encode(
                temporaryPassword
            )
        );


        // ----------------------------------------------
        // Force password change
        // ----------------------------------------------

        staff.setMustChangePassword(true);


        // ----------------------------------------------
        // Save
        // ----------------------------------------------

        userManagementRepository.save(staff);


        // ----------------------------------------------
        // Temporary development return
        // ----------------------------------------------

        return temporaryPassword;
    }


    // ======================================================
    // GET ALL STAFF
    // ======================================================

    public List<UserManagementResponse> getAllStaff() {

        return userManagementRepository
                .findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // ======================================================
    // CONVERT ENTITY → RESPONSE DTO
    // ======================================================

    private UserManagementResponse convertToResponse(
            UserManagement staff) {

        return new UserManagementResponse(

            staff.getId(),

            staff.getName(),

            staff.getEmail(),

            staff.getRole(),

            staff.getStatus(),

            staff.getPatients()
        );
    }
}