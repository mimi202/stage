package com.appstage.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entité pour stocker les résultats des quiz
 * Permet le suivi et l'analyse des performances conformément au SMSI
 */
@Entity
@Table(name = "quiz_results")
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private Integer score;
    
    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;
    
    @Column(name = "time_taken")
    private Integer timeTaken; // en secondes
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(columnDefinition = "TEXT")
    private String details; // JSON des réponses détaillées
    
    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    
    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    
    public Integer getTimeTaken() { return timeTaken; }
    public void setTimeTaken(Integer timeTaken) { this.timeTaken = timeTaken; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}