CREATE TABLE dashboard_monitoramento (
    id_dashboard SERIAL PRIMARY KEY,
    laboratorio VARCHAR(100),
    media_temperatura DECIMAL(5,2),
    media_umidade DECIMAL(5,2),
    total_presencas INT,
    data_referencia DATE
);

INSERT INTO dashboard_monitoramento
(laboratorio, media_temperatura, media_umidade, total_presencas, data_referencia)
VALUES
('Lab 01', 22.5, 60.0, 15, CURRENT_DATE);