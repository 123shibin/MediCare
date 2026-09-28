package com.medicare.backend.service.Authentication;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.medicare.backend.dto.Authdto.LoginRequest;
import com.medicare.backend.dto.Authdto.LoginResponse;
import com.medicare.backend.dto.Authdto.RegisterRequest;
import com.medicare.backend.dto.Authdto.ChangePasswordRequest;

import com.medicare.backend.models.Authentication.User;
import com.medicare.backend.models.dashboard.UserManagement;

import com.medicare.backend.repository.Authentication.UserRepository;
import com.medicare.backend.repository.Dashboard.UserManagementRepository;

import com.medicare.backend.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;

    private final UserManagementRepository userManagementRepository;

    private final PasswordEncoder encoder;

    private final JwtUtil jwtUtil;


    // =====================================================
    // ADMIN REGISTRATION
    // =====================================================

    public void register(RegisterRequest request) {

        User user = new User();

        user.setEmail(request.getEmail());

        user.setFullname(request.getFullname());

        user.setPassword(
            encoder.encode(request.getPassword())
        );

        repo.save(user);
    }


    // =====================================================
    // LOGIN
    // =====================================================

    public LoginResponse login(LoginRequest request) {

        String email = request.getEmail();

        String password = request.getPassword();


        // =================================================
        // CHECK ADMIN TABLE
        // =================================================

        Optional<User> adminOptional =
                repo.findByEmail(email);


        if (adminOptional.isPresent()) {

            User admin = adminOptional.get();


            if (!encoder.matches(
                    password,
                    admin.getPassword())) {

                throw new RuntimeException(
                    "Invalid email or password"
                );
            }


            String token =
                    jwtUtil.generateToken(
                        admin.getEmail(),
                        "ADMIN"
                    );


            return new LoginResponse(
                token,
                admin.getEmail(),
                "ADMIN",
                false
            );
        }


        // =================================================
        // CHECK STAFF TABLE
        // =================================================

        Optional<UserManagement> staffOptional =
                userManagementRepository.findByEmail(email);


        if (staffOptional.isPresent()) {

            UserManagement staff =
                    staffOptional.get();


            // Check account status

            if ("Inactive".equalsIgnoreCase(
                    staff.getStatus())) {

                throw new RuntimeException(
                    "Account is inactive"
                );
            }


            // Check password

            if (!encoder.matches(
                    password,
                    staff.getPassword())) {

                throw new RuntimeException(
                    "Invalid email or password"
                );
            }


            String role = staff.getRole();


            String token =
                    jwtUtil.generateToken(
                        staff.getEmail(),
                        role
                    );


            boolean mustChange = staff.isMustChangePassword();


            return new LoginResponse(
                token,
                staff.getEmail(),
                role,
                mustChange
            );
        }


        throw new RuntimeException(
            "User not found"
        );
    }


    // =====================================================
    // CHANGE STAFF PASSWORD
    // =====================================================

    public void changePassword(
            String email,
            ChangePasswordRequest request) {


        UserManagement staff =
                userManagementRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                        new RuntimeException(
                            "Staff user not found"
                        )
                    );


        // Encrypt new password

        String encryptedPassword =
                encoder.encode(
                    request.getNewPassword()
                );


        staff.setPassword(
            encryptedPassword
        );


        // Staff no longer needs to change password

        staff.setMustChangePassword(false);


        userManagementRepository.save(staff);
    }
}