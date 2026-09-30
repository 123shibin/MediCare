package com.medicare.backend.controller.Dashboard;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medicare.backend.dto.userdto.UserManagementRequest;
import com.medicare.backend.dto.userdto.UserManagementResponse;
import com.medicare.backend.service.Dashboard.UserManagementService;


@RestController
@RequestMapping("/api/user-management")
public class UserController {

    private final UserManagementService userManagementService;


    public UserController(
            UserManagementService userManagementService) {

        this.userManagementService =
                userManagementService;
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
                    userManagementService
                        .createStaff(request);


            Map<String, Object> response =
                    new HashMap<>();


            response.put(
                "message",
                "Staff account created successfully"
            );

            response.put(
                "email",
                request.getEmail()
            );


            // DEVELOPMENT ONLY
            response.put(
                "temporaryPassword",
                temporaryPassword
            );


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