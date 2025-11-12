import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditarUsuario({ usuario, onUsuarioEditado, onCancelar }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (usuario) {
            setNombre(usuario.nombre);
            setEmail(usuario.email);
            setPassword('');
        }
    }, [usuario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const datos = password 
            ? { nombre, email, password } 
            : { nombre, email };

        axios.put(`http://localhost:5001/api/usuarios/${usuario.id}`, datos)
            .then(response => {
                setMensaje('Usuario actualizado exitosamente');
                onUsuarioEditado();
            })
            .catch(error => {
                setMensaje(error.response?.data?.error || 'Error al actualizar');
            });
    };

    return (
        <div className="formulario">
            <h3>Editar Usuario</h3>
            
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
                    <label>Contraseña (dejar vacío para no cambiar):</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="botones">
                    <button type="submit" className="btn-guardar">
                        Actualizar
                    </button>
                    <button type="button" onClick={onCancelar} className="btn-cancelar">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditarUsuario;
