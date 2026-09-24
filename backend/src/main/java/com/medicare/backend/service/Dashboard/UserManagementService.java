package com.medicare.backend.service.Dashboard;

import com.medicare.backend.dto.userdto.AddUserRequest;
import com.medicare.backend.models.dashboard.UserManagement;
import com.medicare.backend.repository.Dashboard.UserManagementRepository;

import org.springframework.stereotype.Service;

@Service
public class UserManagementService {

    private final UserManagementRepository userRepository;

    public UserManagementService(UserManagementRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserManagement addUser(AddUserRequest request) {

        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }

        // Create User entity
        UserManagement user = new UserManagement();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setStatus(request.getStatus());

        // New user has no patients initially
        user.setPatients(0);

        // Save into database
        return userRepository.save(user);
    }
}
