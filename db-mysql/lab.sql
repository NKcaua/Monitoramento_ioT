CREATE DATABASE iot_leitura;
CREATE TABLE dashboard_monitoramento (
    id_dashboard INT AUTO_INCREMENT PRIMARY KEY,
    laboratorio VARCHAR(100),
    media_temperatura DECIMAL(5,2),
    media_umidade DECIMAL(5,2),
    total_presencas INT,
    total_leituras INT,
    data_referencia DATE,
    atualizado_em DATETIME
);