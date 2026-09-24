package com.medicare.backend.service.Dashboard;

import com.medicare.backend.dto.userdto.AddUserRequest;
import com.medicare.backend.models.dashboard.User;
import com.medicare.backend.repository.Daskboard.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(AddUserRequest request) {

        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }

        // Create User entity
        User user = new User();

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
