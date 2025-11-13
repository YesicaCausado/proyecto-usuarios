#  Sistema de Gestión de Usuarios

Sistema completo de CRUD para gestión de usuarios con React y Node.js. Incluye autenticación simple, registro de usuarios y diseño moderno con gradientes y efectos visuales.


## Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Componentes](#-componentes)
- [Base de Datos](#-base-de-datos)
- [Tecnologías](#-tecnologías)

## Características

- **CRUD Completo** - Crear, leer, actualizar y eliminar usuarios
-  **Sistema de Autenticación** - Login y registro de usuarios
-  **Diseño Moderno** - Interfaz con gradientes, sombras y animaciones
-  **Responsive** - Adaptable a dispositivos móviles y tablets
-  **Navegación con React Router** - Rutas protegidas y redirección automática
-  **Persistencia con localStorage** - Mantiene sesión del usuario
-  **Arquitectura Separada** - Backend API REST y Frontend React independientes

## Estructura del Proyecto

```
proyecto-usuarios1.0/
│
├── backend/
│   ├── config/
│   │   └── database.js         # Configuración MySQL
│   ├── routes/
│   │   └── usuarios.js         # Rutas CRUD + Login
│   ├── server.js               # Servidor Express
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── LoginPage.js        # Página de inicio de sesión
    │   │   ├── RegisterPage.js     # Página de registro
    │   │   └── UsersPage.js        # Gestión de usuarios
    │   ├── components/
    │   │   ├── CrearUsuario.js     # CREATE - Formulario nuevo usuario
    │   │   ├── VerUsuarios.js      # READ - Vista solo lectura
    │   │   ├── EditarUsuario.js    # UPDATE - Formulario edición
    │   │   ├── EliminarUsuario.js  # DELETE - Botón eliminar
    │   │   └── TablaUsuarios.js    # Tabla con acciones
    │   ├── App.js                  # Configuración de rutas
    │   ├── App.css                 # Estilos globales
    │   └── index.js
    └── package.json
```

## Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- MySQL (v8 o superior)
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/YesicaCausado/proyecto-usuarios.git
cd proyecto-usuarios1.0
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

##  Configuración

### Base de Datos MySQL

1. Crear la base de datos:

```sql
CREATE DATABASE usuarios_app;
USE usuarios_app;
```

2. Crear la tabla de usuarios:

```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Configurar conexión a MySQL

Editar `backend/config/database.js`:

```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TuContraseña', 
    database: 'usuarios_app'
});

module.exports = connection;
```

## 🚀 Uso

### Iniciar el Backend

```bash
cd backend
npm start
```

El servidor estará disponible en `http://localhost:5001`

### Iniciar el Frontend

En otra terminal:

```bash
cd frontend
npm start
```

La aplicación estará disponible en `http://localhost:3000`

### Flujo de Usuario

1. **Registro**: Navegar a la página de registro y crear una cuenta
2. **Login**: Iniciar sesión con email y contraseña
3. **Gestión**: Crear, editar, ver y eliminar usuarios
4. **Logout**: Cerrar sesión y volver al login

## API Endpoints

### Autenticación

#### Login
```http
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Login exitoso",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "usuario@example.com"
  }
}
```

**Respuesta error (401):**
```json
{
  "mensaje": "Email o contraseña incorrectos"
}
```

### CRUD de Usuarios

#### Listar todos los usuarios
```http
GET /api/usuarios
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456"
  }
]
```

#### Crear usuario
```http
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@example.com",
  "password": "123456"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Usuario creado exitosamente",
  "user": {
    "id": 2,
    "nombre": "María García",
    "email": "maria@example.com"
  }
}
```

**Respuesta error (400):**
```json
{
  "mensaje": "El email ya existe"
}
```

#### Actualizar usuario
```http
PUT /api/usuarios/:id
Content-Type: application/json

{
  "nombre": "Juan Pérez Actualizado",
  "email": "juan.nuevo@example.com",
  "password": "nuevaPassword"  // Opcional
}
```

**Respuesta (200):**
```json
{
  "mensaje": "Usuario actualizado",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez Actualizado",
    "email": "juan.nuevo@example.com"
  }
}
```

#### Eliminar usuario
```http
DELETE /api/usuarios/:id
```

**Respuesta (200):**
```json
{
  "mensaje": "Usuario eliminado"
}
```

## Componentes

### Páginas

#### LoginPage.js
- Formulario de inicio de sesión
- Validación de credenciales
- Redirección a `/usuarios` al éxito
- Botón para navegar a registro
- Almacena usuario en localStorage

#### RegisterPage.js
- Formulario de registro con validación
- Campos: nombre, email, password (min 6 caracteres)
- Verifica email único
- Redirección automática a login después de registro exitoso

#### UsersPage.js
- Página principal de gestión
- Verifica autenticación con localStorage
- Muestra nombre de usuario
- Botón de logout
- Orquesta todos los componentes CRUD

### Componentes CRUD

#### CrearUsuario.js (CREATE)
```javascript
// Props: onUsuarioCreado (función callback)
// Acción: POST /api/usuarios
// Resultado: Limpia formulario y ejecuta callback
```

#### VerUsuarios.js (READ)
```javascript
// Props: usuarios (array)
// Acción: Solo muestra datos, sin botones de acción
// Resultado: Tabla de solo lectura
```

#### EditarUsuario.js (UPDATE)
```javascript
// Props: usuario (objeto), onCancelar, onUsuarioEditado
// Acción: PUT /api/usuarios/:id
// Resultado: Actualiza y ejecuta callback
```

#### EliminarUsuario.js (DELETE)
```javascript
// Props: usuarioId, onUsuarioEliminado
// Acción: DELETE /api/usuarios/:id con confirmación
// Resultado: Elimina y ejecuta callback
```

#### TablaUsuarios.js (READ + Actions)
```javascript
// Props: usuarios, onEditar, onUsuarioEliminado
// Acción: Muestra tabla con botones Editar y Eliminar
// Resultado: Tabla interactiva completa
```

##  Base de Datos

### Esquema de la tabla `usuarios`

| Campo    | Tipo         | Restricciones          | Descripción           |
|----------|-------------|------------------------|-----------------------|
| id       | INT         | PRIMARY KEY, AUTO_INC  | Identificador único   |
| nombre   | VARCHAR(100)| NOT NULL               | Nombre del usuario    |
| email    | VARCHAR(100)| UNIQUE, NOT NULL       | Email único           |
| password | VARCHAR(255)| NOT NULL               | Contraseña (sin hash) |

### Ejemplo de datos

```sql
INSERT INTO usuarios (nombre, email, password) VALUES
('Juan Pérez', 'juan@example.com', '123456'),
('María García', 'maria@example.com', 'abc123'),
('Pedro López', 'pedro@example.com', 'pass456');
```

## Tecnologías

### Frontend
- **React** 18.x - Biblioteca para interfaces de usuario
- **React Router DOM** 6.x - Enrutamiento y navegación
- **Axios** - Cliente HTTP para peticiones API
- **CSS3** - Estilos con gradientes, sombras y animaciones

### Backend
- **Node.js** 16.x - Entorno de ejecución JavaScript
- **Express** 4.x - Framework web minimalista
- **MySQL2** - Driver MySQL para Node.js
- **CORS** - Middleware para habilitar CORS

### Herramientas
- **npm** - Gestor de paquetes
- **Git** - Control de versiones
- **VS Code** - Editor recomendado

## Características de Diseño

- **Paleta de colores moderna**: Gradientes azul/morado corporativos
- **Efectos glass morphism**: Fondos con blur y transparencias
- **Animaciones suaves**: Transiciones y hover effects
- **Responsive design**: Adaptable a móviles, tablets y desktop
- **Botones con gradientes**: Efectos visuales atractivos
- **Mensajes animados**: Notificaciones con íconos y animaciones

## Notas Importantes

⚠️ **Seguridad**: Esta aplicación es un proyecto educativo. En producción se recomienda:
- Usar bcrypt para hash de contraseñas
- Implementar JWT para autenticación
- Validar y sanitizar entradas
- Usar variables de entorno para credenciales
- Implementar rate limiting
- Agregar validación de tokens CSRF

##  Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto para fines educativos.

##  Autor

**Yesica Causado**
