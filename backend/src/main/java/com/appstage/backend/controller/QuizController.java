package com.appstage.backend.controller;

import com.appstage.backend.model.QuizResult;
import com.appstage.backend.model.User;
import com.appstage.backend.repository.QuizResultRepository;
import com.appstage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Contrôleur pour la gestion des quiz
 * Accessible aux utilisateurs authentifiés uniquement
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Enregistrer le résultat d'un quiz
     */
    @PostMapping("/result")
    public ResponseEntity<?> saveQuizResult(@RequestBody QuizResult quizResult, Authentication auth) {
        try {
            // Récupérer l'utilisateur connecté
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Utilisateur non trouvé");
            }
            
            quizResult.setUser(userOpt.get());
            QuizResult savedResult = quizResultRepository.save(quizResult);
            
            return ResponseEntity.ok(savedResult);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'enregistrement du résultat");
        }
    }
    
    /**
     * Récupérer l'historique des quiz de l'utilisateur connecté
     */
    @GetMapping("/history")
    public ResponseEntity<List<QuizResult>> getMyQuizHistory(Authentication auth) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).build();
            }
            
            List<QuizResult> results = quizResultRepository.findByUserIdOrderByCompletedAtDesc(userOpt.get().getId());
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    /**
     * Récupérer les statistiques de l'utilisateur connecté
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getMyStats(Authentication auth) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).build();
            }
            
            Long userId = userOpt.get().getId();
            Double averageScore = quizResultRepository.getAverageScoreByUserId(userId);
            Long quizCount = quizResultRepository.getQuizCountByUserId(userId);
            
            return ResponseEntity.ok().body(new Object() {
                public final Double averageScore = averageScore != null ? averageScore : 0.0;
                public final Long totalQuizzes = quizCount != null ? quizCount : 0L;
            });
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}