package com.appstage.backend.repository;

import com.appstage.backend.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository pour la gestion des résultats de quiz
 */
@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    
    List<QuizResult> findByUserIdOrderByCompletedAtDesc(Long userId);
    
    @Query("SELECT qr FROM QuizResult qr WHERE qr.completedAt BETWEEN :startDate AND :endDate ORDER BY qr.completedAt DESC")
    List<QuizResult> findByDateRange(@Param("startDate") LocalDateTime startDate, 
                                   @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT AVG(qr.score) FROM QuizResult qr WHERE qr.user.id = :userId")
    Double getAverageScoreByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(qr) FROM QuizResult qr WHERE qr.user.id = :userId")
    Long getQuizCountByUserId(@Param("userId") Long userId);
    
    @Query("SELECT qr FROM QuizResult qr ORDER BY qr.completedAt DESC")
    List<QuizResult> findAllOrderByCompletedAtDesc();
}