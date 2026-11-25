
package com.medicare.backend.service.Authentication;

import java.util.Optional;
import java.util.List;
import java.util.Base64;
import java.security.SecureRandom;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medicare.backend.dto.Authdto.LoginRequest;
import com.medicare.backend.dto.Authdto.LoginResponse;
import com.medicare.backend.dto.Authdto.RegisterRequest;
import com.medicare.backend.dto.Authdto.ChangePasswordRequest;

import com.medicare.backend.models.Authentication.User;
import com.medicare.backend.models.Authentication.PasswordResetToken;
import com.medicare.backend.models.dashboard.UserManagement;

import com.medicare.backend.repository.Authentication.UserRepository;
import com.medicare.backend.repository.Authentication.PasswordResetTokenRepository;
import com.medicare.backend.repository.Dashboard.UserManagementRepository;

import com.medicare.backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository repo;

    private final UserManagementRepository userManagementRepository;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final PasswordEncoder encoder;

    private final JwtUtil jwtUtil;

    private final SecureRandom secureRandom = new SecureRandom();


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


        // CHECK ADMIN TABLE

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
                admin.isMustChangePassword()
            );
        }


        // CHECK STAFF TABLE

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

            boolean mustChange =
                    staff.isMustChangePassword();

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

        String encryptedPassword =
                encoder.encode(
                    request.getNewPassword()
                );

        staff.setPassword(encryptedPassword);

        staff.setMustChangePassword(false);

        userManagementRepository.save(staff);
    }


    // =====================================================
    // GENERATE PASSWORD RESET TOKEN
    // =====================================================

    @Transactional
    public String generateResetToken(String email) {

        String accountType;

        // Check ADMIN account

        if (repo.findByEmail(email).isPresent()) {
            
            accountType = "ADMIN";

        }

        // Check STAFF account

        else if (userManagementRepository
                .findByEmail(email).isPresent()) {

            accountType = "STAFF";

        }

        else {

            throw new RuntimeException(
                "Unable to process password reset request."
            );
        }


        // Invalidate previous unused tokens

        List<PasswordResetToken> oldTokens =
                passwordResetTokenRepository
                    .findByEmailAndUsedFalse(email);

        for (PasswordResetToken oldToken : oldTokens) {

            oldToken.setUsed(true);
        }

        passwordResetTokenRepository.saveAll(oldTokens);


        // Generate secure random token

        byte[] randomBytes = new byte[32];

        secureRandom.nextBytes(randomBytes);

        String resetToken =
                Base64.getUrlEncoder()
                    .withoutPadding()
                    .encodeToString(randomBytes);


        // Hash token before database storage

        String tokenHash = hashToken(resetToken);


        // Create reset token entity

        PasswordResetToken passwordResetToken =
                new PasswordResetToken();

        passwordResetToken.setEmail(email);

        passwordResetToken.setToken(tokenHash);

        passwordResetToken.setExpirationTime(
            LocalDateTime.now().plusMinutes(15)
        );

        passwordResetToken.setUsed(false);


        // Save token

        passwordResetTokenRepository.save(
            passwordResetToken
        );


        // Return ORIGINAL token for email link

        return resetToken;
    }


    // =====================================================
    // VALIDATE PASSWORD RESET TOKEN
    // =====================================================

    @Transactional(readOnly = true)
    public boolean validateResetToken(String token) {

        if (token == null || token.isBlank()) {

            return false;
        }

        try {

            String tokenHash = hashToken(token);

            PasswordResetToken resetToken =
                    passwordResetTokenRepository
                        .findByToken(tokenHash);

            if (resetToken == null) {

                return false;
            }

            // Check whether token is already used

            if (resetToken.isUsed()) {

                return false;
            }

            // Check expiration

            if (resetToken.getExpirationTime()
                    .isBefore(LocalDateTime.now())) {

                return false;
            }

            return true;

        } catch (Exception exception) {

            return false;
        }
    }


    // =====================================================
    // RESET PASSWORD
    // =====================================================

    @Transactional
    public void resetPassword(
            String token,
            String newPassword) {

        if (newPassword == null ||
                newPassword.isBlank()) {

            throw new IllegalArgumentException(
                "New password cannot be empty."
            );
        }

        // Validate token

        if (!validateResetToken(token)) {

            throw new RuntimeException(
                "Invalid or expired reset token."
            );
        }

        String tokenHash = hashToken(token);

        PasswordResetToken resetToken =
                passwordResetTokenRepository
                    .findByToken(tokenHash);

        String email = resetToken.getEmail();


        // CHECK ADMIN ACCOUNT

        Optional<User> adminOptional =
                repo.findByEmail(email);

        if (adminOptional.isPresent()) {

            User admin = adminOptional.get();

            admin.setPassword(
                encoder.encode(newPassword)
            );

            admin.setMustChangePassword(false);

            repo.save(admin);
        }


        // CHECK STAFF ACCOUNT

        else {

            UserManagement staff =
                    userManagementRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                            new RuntimeException(
                                "User account not found."
                            )
                        );

            staff.setPassword(
                encoder.encode(newPassword)
            );

            staff.setMustChangePassword(false);

            userManagementRepository.save(staff);
        }


        // Mark token as used

        resetToken.setUsed(true);

        passwordResetTokenRepository.save(resetToken);
    }


    // =====================================================
    // HASH RESET TOKEN USING SHA-256
    // =====================================================

    private String hashToken(String token) {

        try {

            MessageDigest digest =
                    MessageDigest.getInstance("SHA-256");

            byte[] hashBytes =
                    digest.digest(
                        token.getBytes(StandardCharsets.UTF_8)
                    );

            return Base64.getEncoder()
                    .encodeToString(hashBytes);

        } catch (Exception exception) {

            throw new RuntimeException(
                "Unable to hash reset token.",
                exception
            );
        }
    }

}
