package com.example.TelaLogin.service;

import com.example.TelaLogin.model.Usuario;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service 
public class UsuarioService {
    private final String FILE_PATH = "usuarios.json";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Usuario> buscarTodos() {
        try {
            return objectMapper.readValue(new File(FILE_PATH), new TypeReference<List<Usuario>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public void salvar(Usuario usuario) {
        List<Usuario> usuarios = buscarTodos();
        usuarios.add(usuario);
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILE_PATH), usuarios);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Usuario autenticar(String usernameOuEmail, String senha) {
        return buscarTodos().stream()
                .filter(u -> (u.getEmail().equalsIgnoreCase(usernameOuEmail) || u.getNome().equalsIgnoreCase(usernameOuEmail)) 
                          && u.getSenha().equals(senha))
                .findFirst()
                .orElse(null);
    }

    public boolean emailExiste(String email) {
        return buscarTodos().stream()
                .anyMatch(u -> u.getEmail().equalsIgnoreCase(email));
    }
}
