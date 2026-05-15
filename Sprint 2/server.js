const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const bancoEscrita = new Pool({
    user: "postgres",
    host: "localhost",
    database: "iot_ecrita",
    password: "123456",
    port: 5432
});

const bancoLeitura = new Pool({
    user: "postgres",
    host: "localhost",
    database: "iot_leitura",
    password: "123456",
    port: 5432
});

app.get("/", (req, res) => {
    res.json({
        mensagem: "API IoT funcionando"
    });
});

app.post("/leituras", async (req, res) => {
    try {
        const { temperatura, umidade, presenca, id_sensor } = req.body;

        await bancoEscrita.query(
            `INSERT INTO leituras_sensor
            (temperatura, umidade, presenca, id_sensor)
            VALUES ($1, $2, $3, $4)`,
            [temperatura, umidade, presenca, id_sensor]
        );

        res.json({
            mensagem: "Leitura cadastrada com sucesso no Banco 2"
        });

    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao cadastrar leitura",
            detalhe: erro.message
        });
    }
});

app.get("/dashboard", async (req, res) => {
    try {
        const resultado = await bancoLeitura.query(
            "SELECT * FROM dashboard_monitoramento"
        );

        res.json(resultado.rows);

    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao buscar dashboard",
            detalhe: erro.message
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});