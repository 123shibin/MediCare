package com.medicare.backend.controller.Dashboard;

import org.springframework.web.bind.annotation.RestController;

import com.medicare.backend.dto.userdto.AddUserRequest;
import com.medicare.backend.models.dashboard.User;
import com.medicare.backend.service.Dashboard.UserManagementService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor 
@RestController
@RequestMapping("/user")
public class UserController {
    public final UserManagementService userService;
    @PostMapping("/adduser")
    public ResponseEntity<?> addUser(@RequestBody AddUserRequest request) {
        User createdUser = userService.addUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdUser);
    }
    
}
