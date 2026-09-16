package com.example.TelaLogin.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

public class RecoveringPasswordDTO {

    @NotBlank(message = "O e-mail é obrigatório!") 
    @Email (message = "Digite um e-mail válido!")
    private String email;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
