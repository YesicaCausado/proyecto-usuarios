# Sistema de Gestión de Usuarios

Sistema simple de CRUD para gestión de usuarios con React y Node.js

## Estructura del Proyecto

### Frontend (React)
```
frontend/src/
├── pages/
│   ├── LoginPage.js          # Página de inicio de sesión
│   └── UsersPage.js           # Página principal de gestión
│
├── components/
│   ├── CrearUsuario.js        # CREAR - Formulario para nuevo usuario
│   ├── VerUsuarios.js         # VER - Solo muestra lista de usuarios
│   ├── EditarUsuario.js       # EDITAR - Formulario para actualizar usuario
│   ├── EliminarUsuario.js     # ELIMINAR - Botón con lógica de eliminación
│   └── TablaUsuarios.js       # Tabla completa con acciones
│
└── App.js                     # Configuración de rutas
```

### Backend (Node.js + Express)
```
backend/
├── config/
│   └── database.js            # Conexión a MySQL
├── routes/
│   └── usuarios.js            # Rutas del CRUD + Login
└── server.js                  # Servidor principal
```

## Componentes CRUD

Cada operación está separada en su propio componente:

### 1. **CrearUsuario.js** (CREATE)
- Formulario con nombre, email, password
- POST a `/api/usuarios`
- Al crear exitoso recarga la lista

### 2. **VerUsuarios.js** (READ - Solo vista)
- Muestra tabla simple sin botones
- Solo lectura de datos

### 3. **EditarUsuario.js** (UPDATE)
- Formulario prellenado con datos actuales
- PUT a `/api/usuarios/:id`
- Password opcional

### 4. **EliminarUsuario.js** (DELETE)
- Botón de eliminar con confirmación
- DELETE a `/api/usuarios/:id`
- Recarga lista después de eliminar

### 5. **TablaUsuarios.js** (READ + Acciones)
- Tabla completa con botones Editar y Eliminar
- Usa el componente EliminarUsuario
- Llama a funciones para editar

## Rutas de la API

### Login
```
POST /api/usuarios/login
Body: { email, password }
Response: { message, user: { id, nombre, email } }
```

### Usuarios CRUD
```
GET    /api/usuarios           # Listar todos
POST   /api/usuarios           # Crear nuevo
PUT    /api/usuarios/:id       # Actualizar
DELETE /api/usuarios/:id       # Eliminar
```

## Cómo ejecutar

### Backend
```bash
cd backend
npm install
npm start
# Servidor en http://localhost:5001
```

### Frontend
```bash
cd frontend
npm install
npm start
# App en http://localhost:3000
```

## Base de Datos

Tabla `usuarios`:
```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
```

## Tecnologías

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MySQL2
- **Estilo**: CSS básico (sin frameworks)
