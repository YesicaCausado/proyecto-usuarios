import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true); // true = login, false = registro
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(''); // 'success' o 'error'

    // Función para mostrar mensaje con timeout
    const mostrarMensaje = (texto, tipo) => {
        console.log('🔍 Login - Mostrando mensaje:', texto, 'Tipo:', tipo);
        setMensaje(texto);
        setTipoMensaje(tipo);
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            setMensaje('');
            setTipoMensaje('');
        }, 5000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setTipoMensaje('');

        try {
            const url = isLogin ? 
                'http://localhost:5001/api/login' : 
                'http://localhost:5001/api/register';
            
            const response = await axios.post(url, formData);
            
            if (isLogin) {
                // Login exitoso
                mostrarMensaje('Login exitoso', 'success');
                onLogin(response.data.user);
            } else {
                // Registro exitoso
                mostrarMensaje(response.data.message || 'Usuario registrado exitosamente', 'success');
                setIsLogin(true); // Cambiar a modo login
                setFormData({ nombre: '', email: '', password: '' });
            }
        } catch (error) {
            mostrarMensaje(error.response?.data?.error || 'Error en el servidor', 'error');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ nombre: '', email: '', password: '' });
        setMensaje('');
        setTipoMensaje('');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required={!isLogin}
                                className="form-input"
                            />
                        </div>
                    )}

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
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>

                <div className="toggle-container">
                    <button onClick={toggleMode} className="btn-toggle">
                        {isLogin ? 
                            '¿No tienes cuenta? Regístrate' : 
                            '¿Ya tienes cuenta? Inicia sesión'
                        }
                    </button>
                </div>

                {mensaje && (
                    <div className="message-container">
                        <div className={`message ${tipoMensaje === 'error' ? 'message-error' : 'message-success'}`}>
                            {console.log('🎨 Login - Aplicando clase:', tipoMensaje === 'error' ? 'message-error' : 'message-success')}
                            {mensaje}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;