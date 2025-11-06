const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@#123',  
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