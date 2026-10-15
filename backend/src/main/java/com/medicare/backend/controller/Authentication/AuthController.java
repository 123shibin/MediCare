package com.medicare.backend.controller.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import com.medicare.backend.dto.Authdto.LoginRequest;
import com.medicare.backend.dto.Authdto.LoginResponse;
import com.medicare.backend.dto.Authdto.RegisterRequest;
import com.medicare.backend.dto.Authdto.ChangePasswordRequest;

import com.medicare.backend.service.Authentication.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired 
    private UserService userService;

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
}