import React, { useState } from 'react';
import axios from 'axios';

function CrearUsuario({ onUsuarioCreado }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:5001/api/usuarios', {
            nombre: nombre,
            email: email,
            password: password
        })
        .then(response => {
            setMensaje('Usuario creado exitosamente');
            setNombre('');
            setEmail('');
            setPassword('');
            onUsuarioCreado(); // Recargar la lista
        })
        .catch(error => {
            setMensaje(error.response?.data?.error || 'Error al crear usuario');
        });
    };

    return (
        <div className="formulario">
            <h3>Crear Nuevo Usuario</h3>
            
            {mensaje && <div className="mensaje">{mensaje}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-guardar">
                    Crear Usuario
                </button>
            </form>
        </div>
    );
}

export default CrearUsuario;
