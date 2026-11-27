package com.medicare.backend.controller.Authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import com.medicare.backend.dto.Authdto.LoginRequest;
import com.medicare.backend.dto.Authdto.LoginResponse;
import com.medicare.backend.dto.Authdto.RegisterRequest;
import com.medicare.backend.dto.Authdto.ResetPasswordRequest;
import com.medicare.backend.dto.Authdto.ChangePasswordRequest;
import com.medicare.backend.dto.Authdto.ConfirmResetRequest;
import com.medicare.backend.service.Authentication.UserService;
import com.medicare.backend.service.Authentication.EmailService;

import java.util.Map;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor 
public class AuthController {
    
    private final UserService userService;
    private final EmailService emailService;

    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        LoginResponse response =
                userService.login(request);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {

        userService.register(request);

        return ResponseEntity.ok(
            "User registered successfully"
        );
    }


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {


        String email =
                authentication.getName();


        userService.changePassword(
            email,
            request
        );


        return ResponseEntity.ok(
            "Password changed successfully"
        );
    }
    
    // =====================================================
    // REQUEST PASSWORD RESET
    // =====================================================
    
    @PostMapping("/resetpassword")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        try {

            String email = request.getEmail();

            if (email == null || email.isBlank()) {
                return ResponseEntity.badRequest().body(
                    Map.of("message", "Email is required.")
                );
            }

            // Generate secure reset token
            String resetToken =
                    userService.generateResetToken(email);

            // Create tokenized frontend URL
            String resetLink =
                    emailService.createResetLink(resetToken);

            // Send reset email
            emailService.sendResetPasswordLink(
                    email,
                    resetLink
            );

            return ResponseEntity.ok(
                Map.of(
                    "message",
                    "If the account exists, a password reset link will be sent."
                )
            );

        } catch (Exception exception) {

            // Do not reveal whether an email is registered
            return ResponseEntity.ok(
                Map.of(
                    "message",
                    "If the account exists, a password reset link will be sent."
                )
            );
        }
    }

    // =====================================================
    // REQUEST PASSWORD RESET
    // =====================================================

    @PostMapping("/confirm-reset")
    public ResponseEntity<?> confirmReset(
            @RequestBody ConfirmResetRequest request) {

        try {

            String token = request.getToken();

            String newPassword = request.getNewPassword();


            // Validate input

            if (token == null || token.isBlank()) {

                return ResponseEntity.badRequest().body(
                    Map.of("message", "Reset token is required.")
                );
            }

            if (newPassword == null ||
                    newPassword.isBlank()) {

                return ResponseEntity.badRequest().body(
                    Map.of("message", "New password is required.")
                );
            }

            // Validate password strength
            if (newPassword.length() < 8) {

                return ResponseEntity.badRequest().body(
                    Map.of(
                        "message",
                        "Password must contain at least 8 characters."
                    )
                );
            }

            // Validate token
            if (!userService.validateResetToken(token)) {

                return ResponseEntity.badRequest().body(
                    Map.of(
                        "message",
                        "Invalid or expired reset link."
                    )
                );
            }

            // Update password
            userService.resetPassword(
                    token,
                    newPassword
            );

            return ResponseEntity.ok(
                Map.of(
                    "message",
                    "Password has been reset successfully."
                )
            );

        } catch (Exception exception) {

            return ResponseEntity.badRequest().body(
                Map.of(
                    "message",
                    "Unable to reset password. Please request a new reset link."
                )
            );
        }
    }
}