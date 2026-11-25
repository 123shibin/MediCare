package com.medicare.backend.models.Authentication;

import jakarta.persistence.*;


@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "token", nullable = false, unique = true, length = 64)
    private String token;

    @Column(name = "expiration_time")
    private java.time.LocalDateTime expirationTime;

    @Column(name = "used", nullable = false)
    private boolean used;

    // Constructors
    public PasswordResetToken() {}

    public PasswordResetToken(String email, String token, java.time.LocalDateTime expirationTime) {
        this.email = email;
        this.token = token;
        this.expirationTime = expirationTime;
        this.used = false;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public java.time.LocalDateTime getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(java.time.LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }
}
