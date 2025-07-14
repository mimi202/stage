package com.appstage.backend.controller;

import com.appstage.backend.dto.LoginRequest;
import com.appstage.backend.dto.LoginResponse;
import com.appstage.backend.model.User;
import com.appstage.backend.repository.UserRepository;
import com.appstage.backend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Contrôleur d'authentification
 * Gère la connexion sécurisée avec JWT conformément aux standards SMSI
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * Endpoint de connexion sécurisée
     * @param loginRequest Données de connexion (username/email + password)
     * @return Token JWT et informations utilisateur
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Recherche de l'utilisateur par username ou email
            Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
            if (userOpt.isEmpty()) {
                userOpt = userRepository.findByEmail(loginRequest.getUsername());
            }
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Utilisateur non trouvé");
            }
            
            User user = userOpt.get();
            
            // Vérification du compte actif
            if (!user.getIsActive()) {
                return ResponseEntity.status(401).body("Compte désactivé");
            }
            
            // Vérification du mot de passe
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401).body("Mot de passe incorrect");
            }
            
            // Mise à jour de la dernière connexion
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            
            // Génération du token JWT
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
            
            // Préparation de la réponse (sans le mot de passe)
            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setUser(user);
            response.getUser().setPassword(null); // Sécurité : ne pas renvoyer le mot de passe
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur serveur lors de la connexion");
        }
    }
    
    /**
     * Endpoint de validation de token
     * @param token Token JWT à valider
     * @return Statut de validation
     */
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody String token) {
        try {
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                String role = jwtUtil.extractRole(token);
                return ResponseEntity.ok().body("Token valide pour " + username + " (" + role + ")");
            } else {
                return ResponseEntity.status(401).body("Token invalide");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la validation du token");
        }
    }
}