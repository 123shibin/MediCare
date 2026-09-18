package com.medicare.backend.dto;

public class LoginResponse {
    private String accessToken;

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }
    
    // REQUIRED: Getters (for JSON conversion)
    public String getAccessToken() {
        return accessToken;
    }

    // Optional setters
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}


   

    

