package com.medicare.backend.repository.Authentication;

import org.springframework.data.jpa.repository.JpaRepository;
import com.medicare.backend.models.Authentication.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    PasswordResetToken findByToken(String token);
}
