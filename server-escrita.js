const express = require("express");
const cors = require("cors");
const { bancoEscrita, bancoLeitura } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

async function sincronizarDashboard() {
    const resultado = await bancoEscrita.query(`
        SELECT
            l.id_laboratorio,
            l.nome AS laboratorio,
            ROUND(AVG(ls.temperatura), 2) AS media_temperatura,
            ROUND(AVG(ls.umidade), 2) AS media_umidade,
            SUM(CASE WHEN ls.presenca = true THEN 1 ELSE 0 END) AS total_presencas,
            COUNT(*) AS total_leituras,
            CURRENT_DATE AS data_referencia
        FROM leituras_sensor ls
        INNER JOIN sensores s ON s.id_sensor = ls.id_sensor
        INNER JOIN laboratorios l ON l.id_laboratorio = s.id_laboratorio
        GROUP BY l.id_laboratorio, l.nome
    `);

    await bancoLeitura.query("DELETE FROM dashboard_monitoramento");

    for (const item of resultado.rows) {
        await bancoLeitura.query(
            `INSERT INTO dashboard_monitoramento
            (id_laboratorio, laboratorio, media_temperatura, media_umidade, total_presencas, total_leituras, data_referencia, atualizado_em)
            VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`,
            [
                item.id_laboratorio,
                item.laboratorio,
                item.media_temperatura,
                item.media_umidade,
                item.total_presencas,
                item.total_leituras,
                item.data_referencia
            ]
        );
    }
}

app.get("/", (req, res) => {
    res.json({
        servidor: "Escrita",
        status: "Funcionando"
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

        await sincronizarDashboard();

        res.json({
            mensagem: "Leitura salva e dashboard sincronizado"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});

app.listen(3001, () => {
    console.log("Servidor de escrita rodando em http://localhost:3001");
});