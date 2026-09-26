package com.medicare.backend.repository.Dashboard;

import com.medicare.backend.models.dashboard.UserManagement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserManagementRepository
        extends JpaRepository<UserManagement, Long> {

    Optional<UserManagement> findByEmail(String email);
}
