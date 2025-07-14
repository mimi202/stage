package com.appstage.backend.controller;

import com.appstage.backend.model.Content;
import com.appstage.backend.model.QuizResult;
import com.appstage.backend.model.User;
import com.appstage.backend.repository.ContentRepository;
import com.appstage.backend.repository.QuizResultRepository;
import com.appstage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Contrôleur pour l'espace administrateur
 * Accès restreint aux utilisateurs avec rôle ADMIN
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ContentRepository contentRepository;
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Récupérer tous les utilisateurs
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Masquer les mots de passe pour la sécurité
        users.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(users);
    }
    
    /**
     * Créer un nouvel utilisateur
     */
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // Vérifier l'unicité du username et email
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body("Ce nom d'utilisateur existe déjà");
            }
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Cet email existe déjà");
            }
            
            // Encoder le mot de passe
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            User savedUser = userRepository.save(user);
            savedUser.setPassword(null); // Ne pas renvoyer le mot de passe
            
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la création de l'utilisateur");
        }
    }
    
    /**
     * Mettre à jour un utilisateur
     */
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userUpdate) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOpt.get();
            user.setNom(userUpdate.getNom());
            user.setPrenom(userUpdate.getPrenom());
            user.setEmail(userUpdate.getEmail());
            user.setGenre(userUpdate.getGenre());
            user.setAcademie(userUpdate.getAcademie());
            user.setDepartement(userUpdate.getDepartement());
            user.setResponsabilite(userUpdate.getResponsabilite());
            user.setRole(userUpdate.getRole());
            user.setIsActive(userUpdate.getIsActive());
            
            // Mettre à jour le mot de passe seulement s'il est fourni
            if (userUpdate.getPassword() != null && !userUpdate.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
            }
            
            User savedUser = userRepository.save(user);
            savedUser.setPassword(null);
            
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour");
        }
    }
    
    /**
     * Supprimer un utilisateur (désactivation)
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOpt.get();
            user.setIsActive(false); // Désactivation au lieu de suppression
            userRepository.save(user);
            
            return ResponseEntity.ok().body("Utilisateur désactivé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la suppression");
        }
    }
    
    /**
     * Récupérer l'historique des quiz d'un utilisateur
     */
    @GetMapping("/users/{id}/quiz-history")
    public ResponseEntity<List<QuizResult>> getUserQuizHistory(@PathVariable Long id) {
        List<QuizResult> results = quizResultRepository.findByUserIdOrderByCompletedAtDesc(id);
        return ResponseEntity.ok(results);
    }
    
    /**
     * Récupérer tous les résultats de quiz
     */
    @GetMapping("/quiz-results")
    public ResponseEntity<List<QuizResult>> getAllQuizResults() {
        List<QuizResult> results = quizResultRepository.findAllOrderByCompletedAtDesc();
        return ResponseEntity.ok(results);
    }
    
    /**
     * Récupérer tous les contenus
     */
    @GetMapping("/contents")
    public ResponseEntity<List<Content>> getAllContents() {
        List<Content> contents = contentRepository.findAll();
        return ResponseEntity.ok(contents);
    }
    
    /**
     * Supprimer un contenu
     */
    @DeleteMapping("/contents/{id}")
    public ResponseEntity<?> deleteContent(@PathVariable Long id) {
        try {
            Optional<Content> contentOpt = contentRepository.findById(id);
            if (contentOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Content content = contentOpt.get();
            content.setIsActive(false); // Désactivation
            contentRepository.save(content);
            
            return ResponseEntity.ok().body("Contenu supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la suppression du contenu");
        }
    }
}