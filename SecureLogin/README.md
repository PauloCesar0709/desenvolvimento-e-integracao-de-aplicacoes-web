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

## 📚 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Modelo de Dados](#-modelo-de-dados)
- [Instalação e Execução](#-instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [Como Executar](#-como-executar)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Documentações Utilizadas](#-documentações-utilizadas)
- [Autor](#-autor)
- [Agradecimentos](#-agradecimentos)

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

## 🧬 Modelo de Dados

| Entidade | Campos principais |
| :--- | :--- |
| **Usuário** | `nome`, `email(único)`, `senha` |

---

## 🔧 Instalação e Execução

### Pré-requisitos

- **Java JDK 25** ou superior
- **Maven**
- **Git**
- Uma conta de e-mail com **senha de aplicativo** habilitada (ex: Gmail), para envio dos e-mails de recuperação de senha

---

### 🔑 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `MAIL_USERNAME` | E-mail remetente usado pelo SMTP. | `seuemail@gmail.com` |
| `MAIL_PASSWORD` | Senha de aplicativo do e-mail remetente. | `xxxxxxxxxxxxxxxx` |

---

### ⚡ Como Executar

```bash
# Clone o repositório
git clone https://github.com/PauloCesar0709/desenvolvimento-e-integracao-de-aplicacoes-web.git
cd SecureLogin

# Execute com o Maven Wrapper
./mvnw clean install

./mvnw spring-boot:run
```

🚀 A aplicação estará disponível em **http://localhost:8080**.

---

## 🌐 Rotas da Aplicação

| Método | Rota | Acesso | Descrição |
| :--- | :--- | :--- | :--- |
| GET/POST | `/login` | Público | Página de login |
| GET/POST | `/register` | Público | Cadastro de novo usuário |
| GET | `/home` | Autenticado | Painel do usuário comum |
| GET/POST | `/recoverpassword` | Público | Solicitação de recuperação de senha |
| POST | `/logout` | Autenticado | Logout |

---

## 🔗 Documentações Utilizadas

- 📖 [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- 📖 [Spring Security Reference](https://docs.spring.io/spring-security/reference/)
- 📖 [Thymeleaf Documentation](https://www.thymeleaf.org/documentation.html)

---

## 👤 Autor

| 👤 Nome | GitHub |
|---------|-------------------|
| Paulo César | [github.com/PauloCesar0709](https://github.com/PauloCesar0709) |

---

## 🙏 Agradecimentos
Em ambiente acadêmico, citar fontes e inspirações é crucial (integridade acadêmica). Em ambiente profissional, mostra humildade e conexão com a comunidade.

Gostaria de agradecer aos seguintes canais e pessoas que foram fundamentais para o desenvolvimento deste projeto:

* [**Engenharia de Software PUC Minas**](https://www.instagram.com/engsoftwarepucminas/) - Pelo apoio institucional, estrutura acadêmica e fomento à inovação e boas práticas de engenharia.
* [**Prof. Dr. João Paulo Aramuni**](https://github.com/joaopauloaramuni) - Pelos valiosos ensinamentos sobre **Arquitetura de Software** e **Padrões de Projeto**.

---
