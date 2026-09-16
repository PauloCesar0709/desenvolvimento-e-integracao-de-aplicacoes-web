package com.example.SecureLogin.controller;

import com.example.SecureLogin.dto.RecoveringPasswordDTO;
import com.example.SecureLogin.dto.LoginDTO;
import com.example.SecureLogin.dto.UsuarioDTO;
import com.example.SecureLogin.model.Usuario;
import com.example.SecureLogin.service.SendEmailService;
import com.example.SecureLogin.service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;



@Controller 
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired 
    private SendEmailService sendEmailService;

    // 1. TELA DE LOGIN
    @GetMapping("/login")
    public String showLoginForm(Model model) {
        if (!model.containsAttribute("loginDTO")) {
            model.addAttribute("loginDTO", new LoginDTO());
        }
        return "login";
    }

    @PostMapping("/login")
    public String processLogin(@Valid @ModelAttribute("loginDTO") LoginDTO loginDTO, BindingResult result, HttpSession session) {

        if (result.hasErrors()) {
            return "login";
        }

        Usuario usuarioAutenticado = usuarioService.autenticar(loginDTO.getUsername(), loginDTO.getPassword());

        if (usuarioAutenticado == null) {
            result.reject("loginError", "Usuário/E-mail ou senha inválidos.");
            return "login";
        }

        session.setAttribute("usuarioLogado", usuarioAutenticado.getNome());
        return "redirect:/home";
    }

    // 2. TELA DE CADASTRO
    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        if (!model.containsAttribute("usuarioDTO")) {
            model.addAttribute("usuarioDTO", new UsuarioDTO());
        }
        return "cadastro";
    }

    @PostMapping("/register")
    public String processRegister(@Valid @ModelAttribute("usuarioDTO") UsuarioDTO usuarioDTO,
                                  BindingResult result,
                                  RedirectAttributes redirectAttributes) {

        if (usuarioDTO.getSenha() != null && !usuarioDTO.getSenha().equals(usuarioDTO.getConfirmarSenha())) {
            result.rejectValue("confirmarSenha", "error.usuarioDTO", "As senhas não coincidem.");
        }

        if (usuarioService.emailExiste(usuarioDTO.getEmail())) {
            result.rejectValue("email", "error.usuarioDTO", "Este e-mail já está cadastrado.");
        }

        if (result.hasErrors()) {
            return "cadastro";
        }

        Usuario novoUsuario = new Usuario(
            usuarioDTO.getNome(),
            usuarioDTO.getEmail(),
            usuarioDTO.getSenha()
        );
        usuarioService.salvar(novoUsuario);

        redirectAttributes.addFlashAttribute("sucesso", "Cadastro realizado com sucesso! Faça login.");
        return "redirect:/login";
    }

    // 3. TELA HOME
    @GetMapping("/home")
    public String showHome(HttpSession session, Model model) {
        String usuario = (String) session.getAttribute("usuarioLogado");
        if (usuario == null) {
            return "redirect:/login";
        }
        model.addAttribute("nomeUsuario", usuario);
        return "home";
    }

    @GetMapping("/recoverpassword")
    public String showEmailForm(Model model) {
        if (!model.containsAttribute("recoveringPasswordDTO")) {
            model.addAttribute("recoveringPasswordDTO", new RecoveringPasswordDTO());
        }
        return "recoverpassword";
    }

    // Processa o envio do e-mail
    @PostMapping("/recoverpassword")
    public String processarEnvioEmail(@Valid @ModelAttribute("recoveringPasswordDTO") RecoveringPasswordDTO recoveringPasswordDTO,
                                     BindingResult result,
                                     Model model) {
        if (result.hasErrors()) {
            return "recoverpassword";
        }

        try {
            sendEmailService.enviarEmailTexto(
                recoveringPasswordDTO.getEmail(),
                "Recuperação de Senha - Sistema",
                "Olá! Recebemos sua solicitação. Caso queira redefinir sua senha, utilize o sistema."
            );
            model.addAttribute("mensagemSucesso", "E-mail enviado com sucesso!");
        } catch (Exception e) {
            model.addAttribute("mensagemErro", "Erro ao enviar e-mail. Tente novamente.");
        }

        return "recoverpassword";
    }
        
    
    // 4. LOGOUT
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}

