package com.medicare.backend.security;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class TemporaryPasswordGenerator {

    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            + "abcdefghijklmnopqrstuvwxyz"
            + "0123456789";

    private final SecureRandom random = new SecureRandom();

    public String generate() {

        StringBuilder password = new StringBuilder();

        for (int i = 0; i < 10; i++) {
            password.append(
                CHARACTERS.charAt(
                    random.nextInt(CHARACTERS.length())
                )
            );
        }

        return password.toString();
    }
}