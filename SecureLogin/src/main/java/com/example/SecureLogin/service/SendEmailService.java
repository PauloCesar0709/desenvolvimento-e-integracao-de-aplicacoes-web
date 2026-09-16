package com.example.SecureLogin.service;

import com.example.SecureLogin.dto.RecoveringPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class SendEmailService {
    
    @Autowired
    private JavaMailSender mailSender;    

    public void enviarEmailTexto(String para, String assunto, String conteudo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(para);
        message.setSubject(assunto);
        message.setText(conteudo);

        mailSender.send(message);
    }
}
