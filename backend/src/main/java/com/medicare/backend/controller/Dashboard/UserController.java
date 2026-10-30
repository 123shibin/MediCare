package com.medicare.backend.controller.Dashboard;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medicare.backend.dto.userdto.UserManagementRequest;
import com.medicare.backend.dto.userdto.UserManagementResponse;
import com.medicare.backend.service.Dashboard.UserManagementService;
import com.medicare.backend.service.Authentication.EmailService;


@RestController
@RequestMapping("/api/user-management")
public class UserController {

    private final UserManagementService userManagementService;
    private final EmailService emailService;

    public UserController(
            UserManagementService userManagementService,
            EmailService emailService) {

        this.userManagementService =
                userManagementService;
        this.emailService = emailService;
    }


    // ======================================================
    // GET ALL STAFF
    // ======================================================

    @GetMapping
    public ResponseEntity<List<UserManagementResponse>>
            getAllUsers() {

        List<UserManagementResponse> users =
                userManagementService.getAllStaff();

        return ResponseEntity.ok(users);
    }


    // ======================================================
    // CREATE STAFF
    // ======================================================

    
@PostMapping
public ResponseEntity<?> createUser(
        @RequestBody UserManagementRequest request) {

    try {

        String temporaryPassword =
                userManagementService.createStaff(request);

        // Send temporary password to the newly created user's email
        emailService.sendTemporaryPassword(
                request.getEmail(),
                temporaryPassword
        );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
            "message",
            "Staff account created and temporary password sent successfully"
        );

        response.put(
            "email",
            request.getEmail()
        );

        // Do not return temporary password to frontend

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        return ResponseEntity
                .badRequest()
                .body(
                    Map.of(
                        "message",
                        e.getMessage()
                    )
                );
    }
}

}