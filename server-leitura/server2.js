const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());

const bancoLeitura = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "iot_leitura",
  port: 3306
});

app.get("/", (req, res) => {
  res.json({
    servidor: "READ",
    banco: "MySQL",
    status: "Funcionando"
  });
});

app.get("/dashboard", async (req, res) => {
  try {
    const [dados] = await bancoLeitura.query(`
      SELECT *
      FROM dashboard_monitoramento
      WHERE id_dashboard IN (
        SELECT MAX(id_dashboard)
        FROM dashboard_monitoramento
        GROUP BY laboratorio
      )
      ORDER BY laboratorio;
    `);

    res.json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
});

app.post("/sync", async (req, res) => {
  try {
    const { laboratorio, temperatura, umidade, presenca } = req.body;

    await bancoLeitura.query(
      `INSERT INTO dashboard_monitoramento
      (
        laboratorio,
        media_temperatura,
        media_umidade,
        total_presencas,
        total_leituras,
        data_referencia,
        atualizado_em
      )
      VALUES (?, ?, ?, ?, ?, CURDATE(), NOW())`,
      [
        laboratorio || "Lab 01",
        temperatura,
        umidade,
        presenca ? 1 : 0,
        1
      ]
    );

    res.json({
      mensagem: "Dados sincronizados no MySQL"
    });
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
});

app.listen(3002, () => {
  console.log("Servidor READ rodando em http://localhost:3002");
});