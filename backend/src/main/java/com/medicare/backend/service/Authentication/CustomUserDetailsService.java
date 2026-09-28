package com.medicare.backend.service.Authentication;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.Optional;


import com.medicare.backend.models.Authentication.User;
import com.medicare.backend.models.dashboard.UserManagement;
import com.medicare.backend.repository.Authentication.UserRepository;
import com.medicare.backend.repository.Dashboard.UserManagementRepository;


@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
private final UserManagementRepository userManagementRepository;

    @Override
public UserDetails loadUserByUsername(String email)
        throws UsernameNotFoundException {

    System.out.println("loadUserByUsername: " + email);

    // 1. Check ADMIN table
    Optional<User> admin =
            userRepository.findByEmail(email);

    if (admin.isPresent()) {
        return new CustomUserDetail(admin.get());
    }

    // 2. Check STAFF table
    Optional<UserManagement> staff =
            userManagementRepository.findByEmail(email);

    if (staff.isPresent()) {
        return new CustomStaffUserDetail(staff.get());
    }

    throw new UsernameNotFoundException(
            "No user found with email: " + email
    );
}
}