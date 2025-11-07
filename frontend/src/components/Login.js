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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            const url = isLogin ? 
                'http://localhost:5001/api/login' : 
                'http://localhost:5001/api/register';
            
            const response = await axios.post(url, formData);
            
            if (isLogin) {
                // Login exitoso
                setMensaje('Login exitoso');
                onLogin(response.data.user);
            } else {
                // Registro exitoso
                setMensaje('Usuario registrado exitosamente');
                setIsLogin(true); // Cambiar a modo login
                setFormData({ nombre: '', email: '', password: '' });
            }
        } catch (error) {
            setMensaje(error.response?.data?.error || 'Error en el servidor');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ nombre: '', email: '', password: '' });
        setMensaje('');
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Nombre:
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required={!isLogin}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    )}

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
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <button
                        onClick={toggleMode}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#007bff',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isLogin ? 
                            '¿No tienes cuenta? Regístrate' : 
                            '¿Ya tienes cuenta? Inicia sesión'
                        }
                    </button>
                </div>

                {mensaje && (
                    <div style={{
                        marginTop: '15px',
                        padding: '10px',
                        backgroundColor: mensaje.includes('exitoso') ? '#d4edda' : '#f8d7da',
                        color: mensaje.includes('exitoso') ? '#155724' : '#721c24',
                        border: `1px solid ${mensaje.includes('exitoso') ? '#c3e6cb' : '#f5c6cb'}`,
                        borderRadius: '4px',
                        textAlign: 'center'
                    }}>
                        {mensaje}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;