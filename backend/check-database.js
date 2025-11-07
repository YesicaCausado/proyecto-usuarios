const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'usuarios_app',
    port: process.env.DB_PORT || 3306
});

// Verificar y crear la tabla usuarios con la estructura correcta
const createTableQuery = `
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

connection.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err);
        return;
    }
    
    console.log('✅ Conectado a MySQL');
    
    // Crear la tabla
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('❌ Error creando tabla:', err);
        } else {
            console.log('✅ Tabla usuarios verificada/creada correctamente');
        }
        
        // Verificar estructura de la tabla
        connection.query('DESCRIBE usuarios', (err, results) => {
            if (err) {
                console.error('❌ Error al describir tabla:', err);
            } else {
                console.log('📋 Estructura de la tabla usuarios:');
                console.table(results);
            }
            
            connection.end();
        });
    });
});