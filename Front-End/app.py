from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('iot_lab.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    leituras = conn.execute('SELECT * FROM leituras ORDER BY data_hora DESC').fetchall()
    conn.close()
    return render_template('index.html', laboratorios=leituras)

if __name__ == '__main__':
    app.run(debug=True)