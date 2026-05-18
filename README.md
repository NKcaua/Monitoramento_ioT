

# Plataforma de Monitoramento IoT para Laboratórios

Projeto desenvolvido para a disciplina de Banco de Dados utilizando arquitetura CQRS (Command Query Responsibility Segregation).

## 📌 Objetivo

O sistema foi desenvolvido para monitorar laboratórios da faculdade utilizando sensores IoT responsáveis por coletar:

- Temperatura
- Umidade
- Presença

A aplicação separa as operações de escrita e leitura em bancos diferentes para melhorar desempenho, organização e escalabilidade.

---

# 🚀 Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Thunder Client
- Visual Studio Code

---

# 🏗️ Arquitetura CQRS

O projeto utiliza separação entre:

## Banco 2 — Escrita (`iot_ecrita`)
Responsável por:
- INSERT
- UPDATE
- DELETE
- Recebimento dos dados dos sensores

Tabelas:
- laboratorios
- sensores
- leituras_sensor
- alertas

---

## Banco 3 — Leitura (`iot_leitura`)
Responsável por:
- SELECT
- Dashboard
- Relatórios
- Consultas rápidas

Tabela:
- dashboard_monitoramento

---

# 🔄 Fluxo do Sistema

Sensores IoT → API Node.js → Banco Escrita → Banco Leitura → Dashboard

---

# 📡 Rotas da API

## GET /

Verifica se a API está funcionando.

---

## GET /dashboard

Retorna os dados do dashboard do banco de leitura.

---

## POST /leituras

Insere leituras dos sensores no banco de escrita.

### Exemplo JSON:

```json
{
  "temperatura": 25,
  "umidade": 60,
  "presenca": true,
  "id_sensor": 1
}

# Sprint 1 — Plataforma de Monitoramento IoT para Laboratórios

## Objetivo

O Sprint 1 teve como objetivo definir a arquitetura inicial do sistema, criar os bancos de dados e preparar a autenticação com Firebase.

## Tema

O projeto consiste em uma plataforma IoT para monitoramento de laboratórios da faculdade, coletando dados de temperatura, umidade e presença.

## Arquitetura

Foi utilizada a arquitetura CQRS, separando escrita e leitura em bancos diferentes.

## Banco de Escrita

Banco: iot_ecrita

Responsável por armazenar os dados brutos dos sensores.

Tabelas:
- laboratorios
- sensores
- leituras_sensor
- alertas

## Banco de Leitura

Banco: iot_leitura

Responsável por armazenar dados consolidados para dashboard.

Tabela:
- dashboard_monitoramento

## Firebase

O Firebase Authentication será utilizado para autenticação dos usuários do sistema, como técnicos, professores e administradores.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Firebase Authentication
- Visual Studio Code
- Thunder Client

## Conclusão

O Sprint 1 estruturou a base do projeto, com a modelagem dos bancos, arquitetura CQRS e preparação da autenticação.

