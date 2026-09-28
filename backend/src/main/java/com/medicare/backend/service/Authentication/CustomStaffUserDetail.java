package com.medicare.backend.service.Authentication;

import com.medicare.backend.models.dashboard.UserManagement;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomStaffUserDetail implements UserDetails {

    private final UserManagement user;

    public CustomStaffUserDetail(UserManagement user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(
            new SimpleGrantedAuthority(
                "ROLE_" + user.getRole().toUpperCase()
            )
        );
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return "Active".equalsIgnoreCase(user.getStatus());
    }

    public boolean isMustChangePassword() {
        return user.isMustChangePassword();
    }

    public String getRole() {
        return user.getRole();
    }
}