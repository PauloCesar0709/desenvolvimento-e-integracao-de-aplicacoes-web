package com.example.APIClima.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class ClimaService {

    private static final String BASE_URL = "api.open-meteo.com/v1";

    private String consultarURL(String apiUrl){
        String dados = "";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(apiUrl, String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            dados = responseEntity.getBody();
        } else {
            dados = "Falha ao obter dados. Código de status: " + responseEntity.getStatusCode();
        }

        return dados;
    }

    public String consultarClimaBh(){
        return consultarURL( "https://"+BASE_URL + "/forecast?latitude=-19.9167&longitude=-43.9345&hourly=temperature_2m");
    }

    public String consultarClimaPorCidade(String nome){
        return consultarURL("https://geocoding-"+BASE_URL+"/search?name="+nome.replace("-"," ")+"&count=1&language=pt&format=json");
    }


}
