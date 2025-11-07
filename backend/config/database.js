const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@#123',
    database: 'usuarios_app',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:',
            err);
        return;
    }
    console.log('✅ Conectado a MySQL');
});

module.exports = connection;