package com.medicare.backend.repository.Authentication;

import org.springframework.data.jpa.repository.JpaRepository;
import com.medicare.backend.models.Authentication.PasswordResetToken;

import java.util.List;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Integer> {

    PasswordResetToken findByToken(String token);

    List<PasswordResetToken> findByEmailAndUsedFalse(String email);
}