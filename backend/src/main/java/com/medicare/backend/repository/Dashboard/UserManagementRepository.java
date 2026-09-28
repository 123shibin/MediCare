package com.medicare.backend.repository.Dashboard;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.backend.models.dashboard.UserManagement;

public interface UserManagementRepository
        extends JpaRepository<UserManagement, Long> {

    Optional<UserManagement> findByEmail(String email);
    boolean existsByEmail(String email);
}