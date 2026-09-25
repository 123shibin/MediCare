package com.medicare.backend.repository.Authentication;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicare.backend.models.Authentication.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}