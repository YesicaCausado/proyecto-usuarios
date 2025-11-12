import React from 'react';
import EliminarUsuario from './EliminarUsuario';

// Componente que muestra tabla con botones de acción (Editar y Eliminar)
function TablaUsuarios({ usuarios, onEditar, onUsuarioEliminado }) {

    return (
        <div className="tabla-usuarios">
            <h3>Gestión de Usuarios</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button 
                                    onClick={() => onEditar(usuario)}
                                    className="btn-editar">
                                    Editar
                                </button>
                                <EliminarUsuario 
                                    usuarioId={usuario.id}
                                    onEliminado={onUsuarioEliminado}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaUsuarios;
