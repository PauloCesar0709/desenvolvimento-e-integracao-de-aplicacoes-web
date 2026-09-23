package com.example.CandidatosTSE.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.CandidatosTSE.service.CandidatosTseService;
import com.example.CandidatosTSE.model.Candidato;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@Controller 
public class CandidatosTseController {
    
    public final CandidatosTseService candidatosTseService;

    public CandidatosTseController(CandidatosTseService candidatosTseService){
        this.candidatosTseService = candidatosTseService;
    }

    @GetMapping("/home")
    public String index(@RequestParam(required = false) String cargo, @RequestParam(required = false) String partido,
    @RequestParam(required = false) String texto, Model model){

        model.addAttribute("candidatos", candidatosTseService.listarTodos());
        model.addAttribute("cargos", candidatosTseService.listarCargos());
        model.addAttribute("partidos", candidatosTseService.listarPartidos());
        

        return "home";
    }

    @PostMapping("/home")
     public String filtragem(@RequestParam(required = false) String cargo, @RequestParam(required = false) String partido,
    @RequestParam(required = false) String texto, Model model){

        candidatosTseService.filtrar(cargo, partido, texto);

        return "login";
    }
}
