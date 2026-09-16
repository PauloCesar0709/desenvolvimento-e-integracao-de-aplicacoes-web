# 🔐 SecureLogin

> Sistema de autenticação seguro desenvolvido em **Spring Boot**, com cadastro de usuários, login com controle de papéis (USER/ADMIN), recuperação de senha por e-mail e páginas renderizadas com **Thymeleaf**.

---

## 🚧 Status do Projeto

![Java](https://img.shields.io/badge/Java-25-007ec6?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.1-007ec6?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-7.1.1-007ec6?style=for-the-badge&logo=springsecurity&logoColor=white)
![Thymeleaf](https://img.shields.io/badge/Thymeleaf-3.1.5-007ec6?style=for-the-badge&logo=thymeleaf&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-3.9.16-007ec6?style=for-the-badge&logo=apachemaven&logoColor=white)

---

## 📝 Sobre o Projeto

O **SecureLoginPUC** é um projeto acadêmico desenvolvido para a disciplina de **Desenvolvimento e Integração de Aplicações Web** da PUC Minas, com o objetivo de aplicar na prática os principais conceitos de autenticação e autorização em aplicações web usando **Spring Security**.

O sistema permite que usuários se cadastrem e façam login. As informações dos usuários cadastrados são guardadas em um arquivo **json** que simula um banco de dados.

---

## ✨ Funcionalidades Principais

- 🔐 **Login seguro** com Spring Security, usando e-mail como identificador.
- 📝 **Cadastro de usuários** com validação de e-mail e nome de usuário duplicados.
- 📨 **Envio de e-mails** transacionais (recuperação de senha) via `JavaMailSender`.
- 🎨 **Interface responsiva** com Thymeleaf + HTML
- 📊 **Persistência de dados cadastrados** via arquivo json.

---

## 🛠 Tecnologias Utilizadas

### 🖥️ Back-end

- **Linguagem:** Java 25
- **Framework:** Spring Boot 4.1.1
- **Segurança:** Spring Security
- **Persistência:** JSON
- **E-mail:** Spring Mail (`JavaMailSender`)
- **Build:** Maven

### 🎨 Front-end

- **Template Engine:** Thymeleaf
- **Estilização:** CSS
- **Fontes:** Googleapis 

---

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas (estilo **MVC + Service Layer**), típica de aplicações Spring Boot:

- **`controller`** — Recebe as requisições HTTP e delega para a camada de serviço (`LoginController`).
- **`services`** — Concentra as regras de negócio (`UsuarioService`, `SendEmailService`).
- **`dto`** — Objetos de transferência de dados usados pela API REST de e-mail (`LoginDTO`, `UsuarioDTO`, `RecoveringPasswordDTO`).
- **`model`** - Modelo de dados para a persistência via arquivo JSON (`Usuario`)

---
