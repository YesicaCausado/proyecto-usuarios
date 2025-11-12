import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            const response = await axios.post('http://localhost:5001/api/usuarios/login', {
                email: email,
                password: password
            });
            
            // Si el login es exitoso, guardar usuario y redirigir
            localStorage.setItem('usuario', JSON.stringify(response.data.user));
            navigate('/usuarios');
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <p>Sistema de Gestión de Usuarios</p>

                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login">
                        Entrar
                    </button>
                </form>

                {mensaje && (
                    <div className="mensaje error">
                        {mensaje}
                    </div>
                )}

                <div className="divider">
                    <span>o</span>
                </div>

                <button 
                    type="button" 
                    className="btn-register"
                    onClick={() => navigate('/register')}
                >
                    ¿No tienes cuenta? Regístrate
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
