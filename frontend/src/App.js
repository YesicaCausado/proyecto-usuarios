import React, { useState } from 'react';
import UserList from './components/ListaUsuarios';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {  
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f8f9fa', 
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Bienvenido, {user.nombre}</span>
            <button 
              onClick={handleLogout}
              style={{
                padding: '5px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cerrar Sesión
            </button>
          </div>
          <UserList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;