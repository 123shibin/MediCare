package com.medicare.backend.controller.Dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medicare.backend.dto.userdto.UserManagementRequest;
import com.medicare.backend.service.Dashboard.UserManagementService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user-management")
public class UserController {

    private final UserManagementService userManagementService;

    public UserController(
            UserManagementService userManagementService) {

        this.userManagementService = userManagementService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(
            @RequestBody UserManagementRequest request) {

        try {

            String temporaryPassword =
                    userManagementService.createStaff(request);

            Map<String, Object> response = new HashMap<>();

            response.put("message",
                    "Staff account created successfully");

            response.put("email",
                    request.getEmail());

            // For development/testing.
            // Later send this through email instead.
            response.put("temporaryPassword",
                    temporaryPassword);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                        "message",
                        e.getMessage()
                    ));
        }
    }
}