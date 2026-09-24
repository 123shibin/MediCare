package com.medicare.backend.controller.Dashboard;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/user")
public class UserController {
    @PostMapping("/adduser")
    public ResponseEntity<?> addUser(@RequestBody String entity) {
        //TODO: process POST request
        
        return ResponseEntity.ok(entity);
    }
    
}
