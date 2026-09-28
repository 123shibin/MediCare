package com.medicare.backend.dto.Authdto;

public class LoginResponse {

    private String accessToken;
    private String email;
    private String role;
    private boolean mustChangePassword;

    public LoginResponse() {
    }

    public LoginResponse(
            String accessToken,
            String email,
            String role,
            boolean mustChangePassword) {

        this.accessToken = accessToken;
        this.email = email;
        this.role = role;
        this.mustChangePassword = mustChangePassword;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isMustChangePassword() {
        return mustChangePassword;
    }

    public void setMustChangePassword(boolean mustChangePassword) {
        this.mustChangePassword = mustChangePassword;
    }
}