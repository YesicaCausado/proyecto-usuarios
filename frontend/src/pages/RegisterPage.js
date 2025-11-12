import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5001/api/usuarios', {
        nombre,
        email,
        password
      });

      if (response.status === 201) {
        setMensaje('¡Usuario creado exitosamente! Redirigiendo al login...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.log('Error completo:', error.response);
      if (error.response) {
        setMensaje(error.response.data.mensaje || 'Error al crear usuario');
      } else {
        setMensaje('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Crear Cuenta</h2>
        <p>Regístrate para comenzar</p>

        {mensaje && (
          <div className={`mensaje ${mensaje.includes('Error') ? 'error' : ''}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="btn-login">
            Registrarse
          </button>
        </form>

        <div className="divider">
          <span>o</span>
        </div>

        <button 
          type="button" 
          className="btn-register"
          onClick={() => navigate('/')}
        >
          ¿Ya tienes cuenta? Inicia Sesión
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
