package com.medicare.backend.repository.Authentication;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.backend.models.register.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
