from flask import Flask, request, jsonify, send_file

app = Flask(__name__, static_url_path='', static_folder='static')

# Создаем базу данных и таблицу, если они не существуют
def init_db():
    import sqlite3
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                var1 INTEGER,
                var2 INTEGER,
                var3 INTEGER
            )
        ''')
        conn.commit()

# Обработчик для загрузки данных в базу
@app.route('/upload', methods=['POST'])
def upload_data():
    data = request.json
    var1 = data.get('var1')
    var2 = data.get('var2')
    var3 = data.get('var3')

    import sqlite3
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO data (var1, var2, var3) VALUES (?, ?, ?)
        ''', (var1, var2, var3))
        conn.commit()

    return jsonify({'message': 'Data saved successfully'}), 201

# Обработчик для скачивания базы данных
@app.route('/download')
def download_db():
    return send_file('database.db', as_attachment=True)

# Обработчик для главной страницы
@app.route('/')
def index():
    return app.send_static_file('index.html')

# Запуск сервера
if __name__ == '__main__':
    import os
    if not os.path.exists('database.db'):
        init_db()
    app.run(debug=True)
