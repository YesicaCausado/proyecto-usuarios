const db = require('./config/database');

console.log('🔍 Verificando estructura de la tabla usuarios...');

// Verificar si la tabla existe y su estructura
db.query('DESCRIBE usuarios', (err, results) => {
    if (err) {
        console.error('❌ Error al describir tabla usuarios:', err);
        
        // Si la tabla no existe, crearla
        if (err.code === 'ER_NO_SUCH_TABLE') {
            console.log('📝 Creando tabla usuarios...');
            const createTable = `
                CREATE TABLE usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            
            db.query(createTable, (err) => {
                if (err) {
                    console.error('❌ Error creando tabla:', err);
                } else {
                    console.log('✅ Tabla usuarios creada correctamente');
                }
                process.exit();
            });
        } else {
            process.exit();
        }
    } else {
        console.log('✅ Estructura de la tabla usuarios:');
        console.table(results);
        
        // Verificar que tiene la columna password
        const hasPassword = results.some(column => column.Field === 'password');
        if (!hasPassword) {
            console.log('❌ Falta la columna password');
            console.log('📝 Agregando columna password...');
            
            db.query('ALTER TABLE usuarios ADD COLUMN password VARCHAR(255) NOT NULL', (err) => {
                if (err) {
                    console.error('❌ Error agregando columna password:', err);
                } else {
                    console.log('✅ Columna password agregada correctamente');
                }
                process.exit();
            });
        } else {
            console.log('✅ La tabla tiene todas las columnas necesarias');
            process.exit();
        }
    }
});