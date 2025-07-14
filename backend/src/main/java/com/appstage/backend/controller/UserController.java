package com.appstage.backend.controller;

import com.appstage.backend.model.User;
import com.appstage.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
            
                user.setPassword(null);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401).body("Mot de passe incorrect");
            }
        } else {
            return ResponseEntity.status(401).body("Utilisateur non trouvé");
        }
    }
}
