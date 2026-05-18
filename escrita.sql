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
    status_sensor VARCHAR(50),
    id_laboratorio INT REFERENCES laboratorios(id_laboratorio)
);

CREATE TABLE leituras_sensor (
    id_leitura BIGSERIAL PRIMARY KEY,
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

INSERT INTO laboratorios
(nome, bloco, capacidade)
VALUES
('Lab Informatica', 'Bloco A', 40);

INSERT INTO sensores
(tipo_sensor, localizacao, status_sensor, id_laboratorio)
VALUES
('Temperatura', 'Parede Norte', 'Ativo', 1);