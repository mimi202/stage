package com.appstage.backend.repository;

import com.appstage.backend.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour la gestion des contenus pédagogiques
 */
@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    
    List<Content> findByIsActiveTrueOrderByCreatedAtDesc();
    
    List<Content> findByTypeAndIsActiveTrueOrderByCreatedAtDesc(Content.TypeContent type);
    
    @Query("SELECT c FROM Content c WHERE c.isActive = true AND " +
           "(LOWER(c.titre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Content> searchByKeyword(@Param("keyword") String keyword);
    
    List<Content> findByAuthorIdAndIsActiveTrueOrderByCreatedAtDesc(Long authorId);
}