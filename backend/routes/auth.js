const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Ruta para registrar usuario
router.post('/register', (req, res) => {
    console.log('📝 Registro - Datos recibidos:', req.body);
    const { nombre, email, password } = req.body;

    // Validación básica
    if (!nombre || !email || !password) {
        console.log('❌ Registro - Faltan campos requeridos');
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    console.log('✅ Registro - Validación básica pasada');

    // Verificar si el email ya existe
    const checkEmail = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(checkEmail, [email], (err, results) => {
        if (err) {
            console.error('Error al verificar email:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Insertar nuevo usuario
        const insertUser = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        db.query(insertUser, [nombre, email, password], (err, result) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }

            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                user: {
                    id: result.insertId,
                    nombre: nombre,
                    email: email
                }
            });
        });
    });
});

// Ruta para login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario por email y password
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const user = results[0];
        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email   
                        }
        });
    });
});

module.exports = router;