package com.appstage.backend.dto;

import com.appstage.backend.model.User;

/**
 * DTO pour les réponses de connexion
 */
public class LoginResponse {
    private String token;
    private User user;
    
    // Getters et Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}