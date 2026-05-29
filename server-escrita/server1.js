const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Pool } = require("pg");
const admin = require("./config/firebase");

const app = express();

app.use(cors());
app.use(express.json());

const bancoEscrita = new Pool({
    user: "postgres",
    host: "localhost",
    database: "iot_escrita",
    password: "123456",
    port: 5432
});

async function verificarToken(req, res, next) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                erro: "Token não informado"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        const usuario = await admin.auth().verifyIdToken(token);

        req.usuario = usuario;

        next();

    } catch (erro) {

        res.status(401).json({
            erro: "Token inválido",
            detalhe: erro.message
        });

    }

}

app.get("/", (req, res) => {

    res.json({
        servidor: "WRITE",
        banco: "PostgreSQL",
        status: "Funcionando"
    });

});

app.get("/firebase", async (req, res) => {

    try {

        const users = await admin.auth().listUsers(1);

        res.json({
            mensagem: "Firebase funcionando",
            usuarios: users.users.length
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

app.post("/leituras", async (req, res) => {

    try {

        const {
            temperatura,
            umidade,
            presenca,
            id_sensor
        } = req.body;

        await bancoEscrita.query(
            `INSERT INTO leituras_sensor
            (
                temperatura,
                umidade,
                presenca,
                id_sensor
            )
            VALUES ($1, $2, $3, $4)`,
            [
                temperatura,
                umidade,
                presenca,
                id_sensor
            ]
        );

        await axios.post("http://localhost:3002/sync", {
    laboratorio: "Lab 01",
    temperatura,
    umidade,
    presenca
});
        res.json({
            mensagem: "Leitura salva e sincronizada",
            usuario: "teste sem token"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

app.listen(3001, () => {
    console.log("Servidor WRITE rodando em http://localhost:3001");
});