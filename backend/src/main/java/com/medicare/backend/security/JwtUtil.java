package com.medicare.backend.security;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import java.util.Date;
import io.jsonwebtoken.security.Keys;
import java.util.Base64;
import java.security.Key;
import org.springframework.beans.factory.annotation.Value;


@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private Key getKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
    }

    public String generateToken(String email) {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(getKey())
            .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            extractEmail(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

