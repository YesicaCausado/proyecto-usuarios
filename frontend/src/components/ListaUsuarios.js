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
                setMensaje('Error al cargar usuarios');
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
            await axios.post('http://localhost:5001/api/usuarios', formData);
            setMensaje('Usuario creado exitosamente');
            setFormData({ nombre: '', email: '', password: '' });
            setShowForm(false);
            cargarUsuarios(); // Recargar la lista
        } catch (error) {
            setMensaje(error.response?.data?.error || 'Error al crear usuario');
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
                
            await axios.put(`http://localhost:5001/api/usuarios/${editingUser.id}`, dataToSend);
            setMensaje('Usuario actualizado exitosamente');
            setFormData({ nombre: '', email: '', password: '' });
            setEditingUser(null);
            setShowForm(false);
            cargarUsuarios(); // Recargar la lista
        } catch (error) {
            setMensaje(error.response?.data?.error || 'Error al actualizar usuario');
        }
    };

    // Eliminar usuario
    const eliminarUsuario = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
                setMensaje('Usuario eliminado exitosamente');
                cargarUsuarios(); // Recargar la lista
            } catch (error) {
                setMensaje(error.response?.data?.error || 'Error al eliminar usuario');
            }
        }
    };

    // Abrir formulario para crear
    const abrirFormularioCrear = () => {
        setFormData({ nombre: '', email: '', password: '' });
        setEditingUser(null);
        setShowForm(true);
        setMensaje('');
    };

    // Abrir formulario para editar
    const abrirFormularioEditar = (usuario) => {
        setFormData({ nombre: usuario.nombre, email: usuario.email, password: '' });
        setEditingUser(usuario);
        setShowForm(true);
        setMensaje('');
    };

    // Cancelar formulario
    const cancelarFormulario = () => {
        setFormData({ nombre: '', email: '', password: '' });
        setEditingUser(null);
        setShowForm(false);
        setMensaje('');
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Gestión de Usuarios</h2>
            
            {/* Botón para crear nuevo usuario */}
            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={abrirFormularioCrear}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    + Agregar Usuario
                </button>
            </div>

            {/* Mostrar mensajes */}
            {mensaje && (
                <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: mensaje.includes('Error') ? '#f8d7da' : '#d4edda',
                    color: mensaje.includes('Error') ? '#721c24' : '#155724',
                    border: `1px solid ${mensaje.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`,
                    borderRadius: '4px'
                }}>
                    {mensaje}
                </div>
            )}

            {/* Formulario para crear/editar usuario */}
            {showForm && (
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                    <form onSubmit={editingUser ? actualizarUsuario : crearUsuario}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Nombre:
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Contraseña{editingUser ? ' (dejar vacío para no cambiar)' : ''}:
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={!editingUser} // Solo requerido al crear, opcional al editar
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <div>
                            <button 
                                type="submit"
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '10px'
                                }}
                            >
                                {editingUser ? 'Actualizar' : 'Crear'}
                            </button>
                            <button 
                                type="button"
                                onClick={cancelarFormulario}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla de usuarios */}
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button 
                                    onClick={() => abrirFormularioEditar(usuario)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#ffc107',
                                        color: 'black',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginRight: '5px'
                                    }}
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => eliminarUsuario(usuario.id)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;