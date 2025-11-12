import React from 'react';

// Componente que solo muestra la lista de usuarios (sin botones de acción)
function VerUsuarios({ usuarios }) {
    
    if (usuarios.length === 0) {
        return <p>No hay usuarios registrados</p>;
    }

    return (
        <div className="lista-usuarios">
            <h3>Lista de Usuarios ({usuarios.length})</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerUsuarios;
