package com.appstage.backend.controller;

import com.appstage.backend.model.User;
import com.appstage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

/**
 * Contrôleur pour la gestion du profil utilisateur
 * Accessible aux utilisateurs authentifiés
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserProfileController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Récupérer le profil de l'utilisateur connecté
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Utilisateur non trouvé");
            }
            
            User user = userOpt.get();
            user.setPassword(null); // Ne pas renvoyer le mot de passe
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la récupération du profil");
        }
    }
    
    /**
     * Mettre à jour le profil de l'utilisateur connecté
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User userUpdate, Authentication auth) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Utilisateur non trouvé");
            }
            
            User user = userOpt.get();
            
            // Mise à jour des champs autorisés
            user.setNom(userUpdate.getNom());
            user.setPrenom(userUpdate.getPrenom());
            user.setEmail(userUpdate.getEmail());
            user.setGenre(userUpdate.getGenre());
            user.setAcademie(userUpdate.getAcademie());
            user.setDepartement(userUpdate.getDepartement());
            user.setResponsabilite(userUpdate.getResponsabilite());
            
            User savedUser = userRepository.save(user);
            savedUser.setPassword(null);
            
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour du profil");
        }
    }
    
    /**
     * Changer le mot de passe de l'utilisateur connecté
     */
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwords, Authentication auth) {
        try {
            String currentPassword = passwords.get("currentPassword");
            String newPassword = passwords.get("newPassword");
            
            if (currentPassword == null || newPassword == null) {
                return ResponseEntity.badRequest().body("Mots de passe manquants");
            }
            
            if (newPassword.length() < 6) {
                return ResponseEntity.badRequest().body("Le nouveau mot de passe doit contenir au moins 6 caractères");
            }
            
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Utilisateur non trouvé");
            }
            
            User user = userOpt.get();
            
            // Vérifier l'ancien mot de passe
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return ResponseEntity.status(401).body("Mot de passe actuel incorrect");
            }
            
            // Mettre à jour avec le nouveau mot de passe
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            
            return ResponseEntity.ok().body("Mot de passe modifié avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors du changement de mot de passe");
        }
    }
}