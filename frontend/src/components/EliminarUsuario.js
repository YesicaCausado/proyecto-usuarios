import React from 'react';
import axios from 'axios';

// Componente solo para eliminar un usuario
function EliminarUsuario({ usuarioId, onEliminado }) {
    
    const handleEliminar = () => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            axios.delete(`http://localhost:5001/api/usuarios/${usuarioId}`)
                .then(() => {
                    alert('Usuario eliminado exitosamente');
                    onEliminado(); // Recargar la lista
                })
                .catch(error => {
                    alert('Error al eliminar: ' + (error.response?.data?.error || 'Error desconocido'));
                });
        }
    };

    return (
        <button onClick={handleEliminar} className="btn-eliminar">
            Eliminar
        </button>
    );
}

export default EliminarUsuario;
