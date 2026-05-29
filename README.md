# Plataforma de Monitoramento IoT para Laboratórios

## Descrição do Projeto

Este projeto foi desenvolvido na disciplina de Laboratório de Banco de Dados com o objetivo de criar uma plataforma de monitoramento IoT para laboratórios acadêmicos.

O sistema permite monitorar em tempo real informações de temperatura, umidade e presença através de sensores distribuídos em diferentes laboratórios.

A solução foi construída utilizando a arquitetura CQRS (Command Query Responsibility Segregation), separando as operações de escrita e leitura em bancos de dados distintos para melhorar desempenho e escalabilidade.

---

## Objetivos

* Monitorar temperatura dos laboratórios
* Monitorar umidade dos ambientes
* Detectar presença de pessoas
* Disponibilizar dashboard para visualização dos dados
* Implementar autenticação segura de usuários
* Aplicar arquitetura CQRS

---

## Tecnologias Utilizadas

### Front-End

* React
* Axios
* CSS

### Back-End

* Node.js
* Express.js

### Banco de Dados

* PostgreSQL (Banco de Escrita)
* MySQL (Banco de Leitura)

### Autenticação

* Firebase Authentication

---

## Arquitetura do Sistema

O sistema utiliza CQRS para separar responsabilidades:

### Banco de Escrita (PostgreSQL)

Responsável por:

* Cadastro de sensores
* Armazenamento das leituras IoT
* Registro de alertas
* Recebimento de dados enviados pelos sensores

### Banco de Leitura (MySQL)

Responsável por:

* Dashboard de monitoramento
* Consultas rápidas
* Dados consolidados
* Exibição para usuários finais

---

## Estrutura do Projeto

```text
Monitoramento-IoT
│
├── Front-End
│   ├── React
│   ├── Firebase
│   └── Dashboard
│
├── Server-Escrita
│   ├── Node.js
│   ├── PostgreSQL
│   └── API REST
│
├── Server-Leitura
│   ├── Node.js
│   ├── MySQL
│   └── Dashboard API
│
└── Documentação
```

---

## Modelagem de Dados

### Banco de Escrita

#### Laboratórios

* id_laboratorio
* nome
* bloco
* capacidade

#### Sensores

* id_sensor
* tipo_sensor
* localizacao
* status_sensor
* id_laboratorio

#### Leituras

* id_leitura
* temperatura
* umidade
* presenca
* data_hora
* id_sensor

#### Alertas

* id_alerta
* tipo_alerta
* descricao
* nivel
* data_alerta
* id_sensor

---

### Banco de Leitura

#### Dashboard Monitoramento

* id_dashboard
* laboratorio
* media_temperatura
* media_umidade
* total_presencas
* total_leituras
* atualizado_em

---

## Funcionalidades

### Login

* Autenticação Firebase
* Controle de acesso
* Validação de usuários

### Dashboard

* Visualização dos laboratórios
* Temperatura média
* Umidade média
* Total de presenças
* Total de leituras

### Sensores

* Cadastro de sensores
* Recebimento de leituras
* Sincronização entre bancos

---

## Fluxo de Funcionamento

1. O sensor envia dados para a API de Escrita.
2. A API grava os dados no PostgreSQL.
3. O serviço de sincronização envia os dados para o MySQL.
4. O Dashboard consulta o banco de leitura.
5. O usuário visualiza as informações em tempo real.

---

## Integrantes

* Integrante 1
* Integrante 2
* Integrante 3
* Integrante 4

---

## Disciplina

Laboratório de Banco de Dados

---

## Arquitetura Utilizada

CQRS (Command Query Responsibility Segregation)

---

## Status do Projeto

Projeto acadêmico concluído e funcional.

* Front-End React
* Firebase Authentication
* API REST Node.js
* PostgreSQL
* MySQL
* Dashboard Web
* CQRS Implementado