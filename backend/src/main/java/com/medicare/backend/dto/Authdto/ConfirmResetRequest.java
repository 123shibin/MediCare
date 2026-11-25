
package com.medicare.backend.dto.Authdto;

public class ConfirmResetRequest {

    private String token;

    private String newPassword;

    public ConfirmResetRequest() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
