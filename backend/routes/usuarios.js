const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios ORDER BY id DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({
                error: 'Error al obtener usuarios',
                details: err.message
            });
        }
        res.json(results);
    });
});

// Crear nuevo usuario
router.post('/', (req, res) => {
    console.log('📝 Creando usuario - Datos recibidos:', req.body);
    const { nombre, email, password } = req.body;

    // Validación
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
    }

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
        const insertQuery = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [nombre, email, password], (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                return res.status(500).json({ error: 'Error al crear usuario' });
            }

            console.log('✅ Usuario creado con ID:', result.insertId);
            res.status(201).json({
                message: 'Usuario creado exitosamente',
                user: {
                    id: result.insertId,
                    nombre: nombre,
                    email: email
                    // No devolvemos la contraseña por seguridad
                }
            });
        });
    });
});

// Actualizar usuario
router.put('/:id', (req, res) => {
    console.log('✏️ Actualizando usuario ID:', req.params.id, 'Datos:', req.body);
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    // Validación
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    // Verificar si el email ya existe en otro usuario
    const checkEmail = 'SELECT * FROM usuarios WHERE email = ? AND id != ?';
    db.query(checkEmail, [email, id], (err, results) => {
        if (err) {
            console.error('Error al verificar email:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado por otro usuario' });
        }

        // Actualizar usuario (con o sin contraseña)
        let updateQuery, queryParams;
        if (password && password.trim() !== '') {
            // Si se proporciona contraseña, actualizarla también
            updateQuery = 'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?';
            queryParams = [nombre, email, password, id];
        } else {
            // Si no se proporciona contraseña, solo actualizar nombre y email
            updateQuery = 'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?';
            queryParams = [nombre, email, id];
        }
        
        db.query(updateQuery, queryParams, (err, result) => {
            if (err) {
                console.error('Error al actualizar usuario:', err);
                return res.status(500).json({ error: 'Error al actualizar usuario' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            console.log('✅ Usuario actualizado correctamente');
            res.json({
                message: 'Usuario actualizado exitosamente',
                user: { id: parseInt(id), nombre, email }
            });
        });
    });
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
    console.log('🗑️ Eliminando usuario ID:', req.params.id);
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM usuarios WHERE id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('✅ Usuario eliminado correctamente');
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
});

module.exports = router;