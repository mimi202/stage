package com.appstage.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO pour les requêtes de connexion
 */
public class LoginRequest {
    
    @NotBlank(message = "Le nom d'utilisateur ou email est obligatoire")
    private String username;
    
    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;
    
    // Getters et Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}