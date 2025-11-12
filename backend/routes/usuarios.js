const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Listar todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (error, usuarios) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
        }
        res.json(usuarios);
    });
});

// Crear usuario
router.post('/', (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    // Verificar si el email ya existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, existe) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al verificar email' });
        }

        if (existe.length > 0) {
            return res.status(400).json({ mensaje: 'El email ya existe' });
        }

        // Insertar usuario
        db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', 
            [nombre, email, password], 
            (error, resultado) => {
                if (error) {
                    return res.status(500).json({ mensaje: 'Error al crear usuario' });
                }
                res.status(201).json({ 
                    mensaje: 'Usuario creado exitosamente',
                    user: { id: resultado.insertId, nombre, email }
                });
            }
        );
    });
});

// Actualizar usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    // Si hay password, actualizar todo. Si no, solo nombre y email
    if (password) {
        db.query('UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?',
            [nombre, email, password, id],
            (error) => {
                if (error) {
                    return res.status(500).json({ mensaje: 'Error al actualizar' });
                }
                res.json({ mensaje: 'Usuario actualizado', user: { id, nombre, email } });
            }
        );
    } else {
        db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
            [nombre, email, id],
            (error) => {
                if (error) {
                    return res.status(500).json({ mensaje: 'Error al actualizar' });
                }
                res.json({ mensaje: 'Usuario actualizado', user: { id, nombre, email } });
            }
        );
    }
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (error) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al eliminar' });
        }
        res.json({ mensaje: 'Usuario eliminado' });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    db.query('SELECT id, nombre, email FROM usuarios WHERE email = ? AND password = ?',
        [email, password],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error en el servidor' });
            }
            if (resultado.length === 0) {
                return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
            }
            res.json({ mensaje: 'Login exitoso', user: resultado[0] });
        }
    );
});

module.exports = router;