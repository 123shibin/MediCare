package com.medicare.backend.service.Dashboard;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medicare.backend.dto.userdto.UserManagementRequest;
import com.medicare.backend.repository.Authentication.UserRepository;
import com.medicare.backend.repository.Dashboard.UserManagementRepository;
import com.medicare.backend.models.dashboard.UserManagement;
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

        // ============================================
        // 1. CHECK ADMIN USERS TABLE
        // ============================================

        if (userRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                "An account with this email already exists"
            );
        }


        // ============================================
        // 2. CHECK STAFF TABLE
        // ============================================

        if (userManagementRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                "A staff member with this email already exists"
            );
        }


        // ============================================
        // 3. GENERATE TEMPORARY PASSWORD
        // ============================================

        String temporaryPassword =
                passwordGenerator.generate();


        // ============================================
        // 4. CREATE STAFF ACCOUNT
        // ============================================

        UserManagement staff = new UserManagement();

        staff.setName(request.getName());
        staff.setEmail(request.getEmail());
        staff.setRole(request.getRole());
        staff.setStatus(request.getStatus());
        staff.setPatients(0);


        // ============================================
        // 5. ENCRYPT PASSWORD
        // ============================================

        staff.setPassword(
            passwordEncoder.encode(temporaryPassword)
        );


        // ============================================
        // 6. FORCE PASSWORD CHANGE
        // ============================================

        staff.setMustChangePassword(true);


        // ============================================
        // 7. SAVE STAFF
        // ============================================

        userManagementRepository.save(staff);


        // ============================================
        // 8. RETURN TEMPORARY PASSWORD
        // ============================================

        // Development/testing for now.
        // Later this will be emailed to the staff member.

        return temporaryPassword;
    }
}