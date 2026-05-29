CREATE DATABASE IF NOT EXISTS iot_leitura;

USE iot_leitura;

CREATE TABLE IF NOT EXISTS dashboard_monitoramento (
    id_dashboard INT AUTO_INCREMENT PRIMARY KEY,
    laboratorio VARCHAR(100),
    media_temperatura DECIMAL(5,2),
    media_umidade DECIMAL(5,2),
    total_presencas INT,
    total_leituras INT,
    data_referencia DATE,
    atualizado_em DATETIME
);

DELETE FROM dashboard_monitoramento;

INSERT INTO dashboard_monitoramento
(
    laboratorio,
    media_temperatura,
    media_umidade,
    total_presencas,
    total_leituras,
    data_referencia,
    atualizado_em
)
VALUES
(
    'Lab 01',
    27,
    55,
    1,
    1,
    CURDATE(),
    NOW()
),
(
    'Lab 02',
    26,
    60,
    0,
    1,
    CURDATE(),
    NOW()
),
(
    'Lab 03',
    28,
    50,
    1,
    1,
    CURDATE(),
    NOW()
);