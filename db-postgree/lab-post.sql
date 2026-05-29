DROP TABLE IF EXISTS leituras_sensor;
DROP TABLE IF EXISTS alertas;
DROP TABLE IF EXISTS sensores;
DROP TABLE IF EXISTS laboratorios;

CREATE TABLE laboratorios (
    id_laboratorio SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    bloco VARCHAR(50),
    capacidade INT
);

CREATE TABLE sensores (
    id_sensor SERIAL PRIMARY KEY,
    tipo_sensor VARCHAR(50),
    localizacao VARCHAR(100),
    status_sensor VARCHAR(20),
    id_laboratorio INT REFERENCES laboratorios(id_laboratorio)
);

CREATE TABLE leituras_sensor (
    id_leitura SERIAL PRIMARY KEY,
    temperatura DECIMAL(5,2),
    umidade DECIMAL(5,2),
    presenca BOOLEAN,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_sensor INT REFERENCES sensores(id_sensor)
);

CREATE TABLE alertas (
    id_alerta SERIAL PRIMARY KEY,
    tipo_alerta VARCHAR(100),
    descricao TEXT,
    nivel VARCHAR(20),
    data_alerta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_sensor INT REFERENCES sensores(id_sensor)
);

INSERT INTO laboratorios (nome, bloco, capacidade)
VALUES
('Lab 01', 'Bloco A', 40),
('Lab 02', 'Bloco B', 35),
('Lab 03', 'Bloco C', 30);

INSERT INTO sensores (tipo_sensor, localizacao, status_sensor, id_laboratorio)
VALUES
('Temperatura/Umidade/Presença', 'Parede Norte', 'Ativo', 1),
('Temperatura/Umidade/Presença', 'Parede Central', 'Ativo', 2),
('Temperatura/Umidade/Presença', 'Entrada Principal', 'Ativo', 3);

INSERT INTO leituras_sensor (temperatura, umidade, presenca, id_sensor)
VALUES
(27.5, 55.0, true, 1),
(24.8, 60.0, false, 2),
(29.2, 48.0, true, 3);

INSERT INTO alertas (tipo_alerta, descricao, nivel, id_sensor)
VALUES
('Temperatura Alta', 'Temperatura acima do ideal no laboratório', 'Médio', 1),
('Umidade Alta', 'Umidade acima do recomendado', 'Baixo', 2),
('Presença Detectada', 'Presença detectada fora do horário', 'Alto', 3);