import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(''); // 'success' o 'error'

    // Función para mostrar mensaje con timeout
    const mostrarMensaje = (texto, tipo) => {
        console.log('🔍 Mostrando mensaje:', texto, 'Tipo:', tipo);
        setMensaje(texto);
        setTipoMensaje(tipo);
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            setMensaje('');
            setTipoMensaje('');
        }, 5000);
    };

    // Cargar usuarios al iniciar
    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Función para cargar todos los usuarios
    const cargarUsuarios = () => {
        axios.get('http://localhost:5001/api/usuarios')
            .then(res => setUsers(res.data))
            .catch(err => {
                console.error(err);
                mostrarMensaje('Error al cargar usuarios', 'error');
            });
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Crear nuevo usuario
    const crearUsuario = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/usuarios', formData);
            mostrarMensaje(response.data.message || 'Usuario creado exitosamente', 'success');
            setFormData({ nombre: '', email: '', password: '' });
            setShowForm(false);
            cargarUsuarios(); // Recargar la lista
        } catch (error) {
            mostrarMensaje(error.response?.data?.error || 'Error al crear usuario', 'error');
        }
    };

    // Actualizar usuario existente
    const actualizarUsuario = async (e) => {
        e.preventDefault();
        try {
            // Si no hay password, solo enviar nombre y email
            const dataToSend = editingUser ? 
                (formData.password ? formData : { nombre: formData.nombre, email: formData.email }) :
                formData;
                
            const response = await axios.put(`http://localhost:5001/api/usuarios/${editingUser.id}`, dataToSend);
            mostrarMensaje(response.data.message || 'Usuario actualizado exitosamente', 'success');
            setFormData({ nombre: '', email: '', password: '' });
            setEditingUser(null);
            setShowForm(false);
            cargarUsuarios(); // Recargar la lista
        } catch (error) {
            mostrarMensaje(error.response?.data?.error || 'Error al actualizar usuario', 'error');
        }
    };

    // Eliminar usuario
    const eliminarUsuario = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                const response = await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
                mostrarMensaje(response.data.message || 'Usuario eliminado exitosamente', 'success');
                cargarUsuarios(); // Recargar la lista
            } catch (error) {
                mostrarMensaje(error.response?.data?.error || 'Error al eliminar usuario', 'error');
            }
        }
    };

    // Abrir formulario para crear
    const abrirFormularioCrear = () => {
        setFormData({ nombre: '', email: '', password: '' });
        setEditingUser(null);
        setShowForm(true);
        setMensaje('');
        setTipoMensaje('');
    };

    // Abrir formulario para editar
    const abrirFormularioEditar = (usuario) => {
        setFormData({ nombre: usuario.nombre, email: usuario.email, password: '' });
        setEditingUser(usuario);
        setShowForm(true);
        setMensaje('');
        setTipoMensaje('');
    };

    // Cancelar formulario
    const cancelarFormulario = () => {
        setFormData({ nombre: '', email: '', password: '' });
        setEditingUser(null);
        setShowForm(false);
        setMensaje('');
        setTipoMensaje('');
    };

    return (
        <div className="usuarios-container">
            <h2 className="usuarios-title">Gestión de Usuarios</h2>
            
            {/* Botón para crear nuevo usuario */}
            <div className="action-section">
                <button onClick={abrirFormularioCrear} className="btn-add">
                    + Agregar Usuario
                </button>
            </div>

            {/* Mostrar mensajes */}
            {mensaje && (
                <div className="message-container">
                    <div className={`message ${tipoMensaje === 'error' ? 'message-error' : 'message-success'}`}>
                        {console.log('🎨 Aplicando clase:', tipoMensaje === 'error' ? 'message-error' : 'message-success', 'para tipo:', tipoMensaje)}
                        {mensaje}
                    </div>
                </div>
            )}

            {/* Formulario para crear/editar usuario */}
            {showForm && (
                <div className="form-container">
                    <h3 className="form-title">{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                    <form className="user-form" onSubmit={editingUser ? actualizarUsuario : crearUsuario}>
                        <div className="form-group">
                            <label className="form-label">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Contraseña{editingUser ? ' (dejar vacío para no cambiar)' : ''}:
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={!editingUser}
                                className="form-input"
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="btn-submit">
                                {editingUser ? 'Actualizar' : 'Crear'}
                            </button>
                            <button type="button" onClick={cancelarFormulario} className="btn-cancel">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla de usuarios */}
            <div className="users-table-container">
                <table className="users-table">
                    <thead className="table-header">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(usuario => (
                            <tr key={usuario.id} className="table-row">
                                <td className="table-cell">{usuario.id}</td>
                                <td className="table-cell">{usuario.nombre}</td>
                                <td className="table-cell">{usuario.email}</td>
                                <td className="table-cell">
                                    <div className="action-buttons">
                                        <button 
                                            onClick={() => abrirFormularioEditar(usuario)}
                                            className="btn-edit"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => eliminarUsuario(usuario.id)}
                                            className="btn-delete"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;