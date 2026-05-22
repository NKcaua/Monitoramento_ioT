import sqlite3

conn = sqlite3.connect('iot_lab.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS leituras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        laboratorio TEXT NOT NULL,
        temperatura REAL NOT NULL,
        umidade REAL NOT NULL,
        presenca BOOLEAN NOT NULL,
        data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

cursor.execute("INSERT INTO leituras (laboratorio, temperatura, umidade, presenca) VALUES ('Lab de Redes', 22.5, 45.0, 1)")
cursor.execute("INSERT INTO leituras (laboratorio, temperatura, umidade, presenca) VALUES ('Lab de Hardware', 24.1, 50.0, 0)")
cursor.execute("INSERT INTO leituras (laboratorio, temperatura, umidade, presenca) VALUES ('Sala de Servidores', 19.0, 40.0, 0)")

conn.commit()
conn.close()