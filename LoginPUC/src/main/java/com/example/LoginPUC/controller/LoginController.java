package com.example.LoginPUC.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// @RestController -> APIs Rest -> Backend //

@Controller
public class LoginController{
    // https://localhost:8080/login //
    @GetMapping("/login")
    public String login(){
        return "Login";
    }
}