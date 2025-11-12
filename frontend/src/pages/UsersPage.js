import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CrearUsuario from '../components/CrearUsuario';
import EditarUsuario from '../components/EditarUsuario';
import TablaUsuarios from '../components/TablaUsuarios';

function UsersPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const navigate = useNavigate();

    // Verificar si hay usuario logueado
    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (!usuario) {
            navigate('/');
            return;
        }
        cargarUsuarios();
    }, [navigate]);

    const cargarUsuarios = () => {
        axios.get('http://localhost:5001/api/usuarios')
            .then(res => setUsuarios(res.data))
            .catch(err => console.error(err));
    };

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    const usuarioActual = JSON.parse(localStorage.getItem('usuario') || '{}');

    return (
        <div className="users-page">
            <div className="header">
                <h1>Gestión de Usuarios</h1>
                <div className="user-info">
                    <span>Bienvenido, {usuarioActual.nombre}</span>
                    <button onClick={cerrarSesion} className="btn-salir">
                        Salir
                    </button>
                </div>
            </div>

            <div className="contenido">
                <button 
                    onClick={() => {
                        setMostrarCrear(!mostrarCrear);
                        setUsuarioEditar(null);
                    }} 
                    className="btn-nuevo">
                    {mostrarCrear ? 'Cancelar' : 'Nuevo Usuario'}
                </button>

                {mostrarCrear && (
                    <CrearUsuario 
                        onUsuarioCreado={() => {
                            cargarUsuarios();
                            setMostrarCrear(false);
                        }}
                    />
                )}

                {usuarioEditar && (
                    <EditarUsuario 
                        usuario={usuarioEditar}
                        onUsuarioEditado={() => {
                            cargarUsuarios();
                            setUsuarioEditar(null);
                        }}
                        onCancelar={() => setUsuarioEditar(null)}
                    />
                )}

                <TablaUsuarios 
                    usuarios={usuarios}
                    onEditar={(usuario) => {
                        setUsuarioEditar(usuario);
                        setMostrarCrear(false);
                    }}
                    onUsuarioEliminado={cargarUsuarios}
                />
            </div>
        </div>
    );
}

export default UsersPage;
