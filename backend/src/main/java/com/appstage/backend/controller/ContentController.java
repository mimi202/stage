package com.appstage.backend.controller;

import com.appstage.backend.model.Content;
import com.appstage.backend.model.User;
import com.appstage.backend.repository.ContentRepository;
import com.appstage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Contrôleur pour la gestion des contenus pédagogiques
 * Accessible aux utilisateurs authentifiés
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/content")
public class ContentController {
    
    @Autowired
    private ContentRepository contentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private final String UPLOAD_DIR = "uploads/";
    
    /**
     * Récupérer tous les contenus actifs
     */
    @GetMapping
    public ResponseEntity<List<Content>> getAllContents() {
        List<Content> contents = contentRepository.findByIsActiveTrueOrderByCreatedAtDesc();
        return ResponseEntity.ok(contents);
    }
    
    /**
     * Récupérer les contenus par type
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Content>> getContentsByType(@PathVariable String type) {
        try {
            Content.TypeContent typeContent = Content.TypeContent.valueOf(type.toUpperCase());
            List<Content> contents = contentRepository.findByTypeAndIsActiveTrueOrderByCreatedAtDesc(typeContent);
            return ResponseEntity.ok(contents);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Rechercher des contenus par mot-clé
     */
    @GetMapping("/search")
    public ResponseEntity<List<Content>> searchContents(@RequestParam String keyword) {
        List<Content> contents = contentRepository.searchByKeyword(keyword);
        return ResponseEntity.ok(contents);
    }
    
    /**
     * Créer un nouveau contenu (Admin uniquement)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createContent(@RequestBody Content content, Authentication auth) {
        try {
            // Récupérer l'utilisateur connecté comme auteur
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isPresent()) {
                content.setAuthor(userOpt.get());
            }
            
            Content savedContent = contentRepository.save(content);
            return ResponseEntity.ok(savedContent);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la création du contenu");
        }
    }
    
    /**
     * Upload de fichier pour un contenu (Admin uniquement)
     */
    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                      @RequestParam("titre") String titre,
                                      @RequestParam("type") String type,
                                      @RequestParam(value = "description", required = false) String description,
                                      Authentication auth) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Fichier vide");
            }
            
            // Créer le répertoire d'upload s'il n'existe pas
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Générer un nom de fichier unique
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = UUID.randomUUID().toString() + extension;
            
            // Sauvegarder le fichier
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath);
            
            // Créer l'entité Content
            Content content = new Content();
            content.setTitre(titre);
            content.setType(Content.TypeContent.valueOf(type.toUpperCase()));
            content.setDescription(description);
            content.setFileName(originalFilename);
            content.setFileUrl("/uploads/" + filename);
            content.setFileSize(file.getSize());
            
            // Récupérer l'auteur
            Optional<User> userOpt = userRepository.findByUsername(auth.getName());
            if (userOpt.isPresent()) {
                content.setAuthor(userOpt.get());
            }
            
            Content savedContent = contentRepository.save(content);
            return ResponseEntity.ok(savedContent);
            
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'upload du fichier");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la création du contenu");
        }
    }
    
    /**
     * Mettre à jour un contenu (Admin uniquement)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateContent(@PathVariable Long id, @RequestBody Content contentUpdate) {
        try {
            Optional<Content> contentOpt = contentRepository.findById(id);
            if (contentOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Content content = contentOpt.get();
            content.setTitre(contentUpdate.getTitre());
            content.setType(contentUpdate.getType());
            content.setDescription(contentUpdate.getDescription());
            
            // Ne pas modifier l'URL du fichier lors d'une mise à jour simple
            if (contentUpdate.getFileUrl() != null && !contentUpdate.getFileUrl().isEmpty()) {
                content.setFileUrl(contentUpdate.getFileUrl());
            }
            
            Content savedContent = contentRepository.save(content);
            return ResponseEntity.ok(savedContent);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour");
        }
    }
}