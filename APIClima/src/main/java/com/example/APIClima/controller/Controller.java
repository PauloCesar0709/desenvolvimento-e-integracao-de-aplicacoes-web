package com.example.APIClima.controller;

import com.example.APIClima.service.ClimaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    ClimaService service = new ClimaService();

    @GetMapping("/climaBh")
    public String consultarClima(){
        return service.consultarClimaBh();
    }

    @GetMapping("/clima/{nome}")
    public String consultarClimaPelaCidade(@PathVariable String nome){
        return service.consultarClimaPorCidade(nome);
    }
}
