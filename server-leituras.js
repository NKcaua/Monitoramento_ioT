const express = require("express");
const cors = require("cors");
const { bancoLeitura } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        servidor: "Leitura",
        status: "Funcionando"
    });
});

app.get("/dashboard", async (req, res) => {
    try {
        const resultado = await bancoLeitura.query(
            "SELECT * FROM dashboard_monitoramento ORDER BY id_dashboard"
        );

        res.json(resultado.rows);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});

app.listen(3002, () => {
    console.log("Servidor de leitura rodando em http://localhost:3002");
});