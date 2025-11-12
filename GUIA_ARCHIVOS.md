# Guía de Archivos - ¿Qué Hace Cada Uno?

## 🔴 BACKEND (Servidor)

### 1. `server.js`
**Función:** Arranca el servidor Express
```javascript
// Hace 3 cosas:
1. Configura CORS (permite que frontend se conecte)
2. Monta las rutas de usuarios
3. Inicia servidor en puerto 5001
```

### 2. `config/database.js`
**Función:** Conexión a MySQL
```javascript
// Crea la conexión a:
- Base de datos: usuarios_app
- Usuario: root
- Contraseña: Pass@#123
```

### 3. `routes/usuarios.js`
**Función:** Define las rutas (endpoints) de la API
```javascript
// Tiene 5 rutas:

GET    /api/usuarios          → Lista todos los usuarios
POST   /api/usuarios          → Crea nuevo usuario
PUT    /api/usuarios/:id      → Actualiza usuario
DELETE /api/usuarios/:id      → Elimina usuario
POST   /api/usuarios/login    → Valida login

// Cada ruta:
1. Recibe datos del frontend
2. Ejecuta consulta SQL en MySQL
3. Devuelve respuesta JSON
```

---

## 🔵 FRONTEND (Interfaz)

### Páginas

#### 1. `LoginPage.js`
**Función:** Pantalla de inicio de sesión
```javascript
// Hace:
1. Muestra formulario (email + password)
2. Envía POST a /api/usuarios/login
3. Guarda usuario en localStorage
4. Redirige a /usuarios
```

#### 2. `UsersPage.js`
**Función:** Pantalla principal de gestión
```javascript
// Hace:
1. Verifica si hay usuario logueado
2. Carga lista de usuarios (GET)
3. Llama a los componentes CRUD
4. Maneja qué mostrar (crear/editar/tabla)
5. Botón cerrar sesión
```

### Componentes CRUD

#### 3. `CrearUsuario.js` - CREATE
**Función:** Formulario para crear usuario
```javascript
// Hace:
1. Muestra formulario (nombre, email, password)
2. Al enviar hace POST a /api/usuarios
3. Si éxito: limpia formulario y recarga lista
```

#### 4. `VerUsuarios.js` - READ (simple)
**Función:** Solo muestra lista de usuarios
```javascript
// Hace:
1. Recibe array de usuarios
2. Muestra tabla simple (sin botones)
3. Solo lectura, no puede editar/eliminar
```

#### 5. `EditarUsuario.js` - UPDATE
**Función:** Formulario para editar
```javascript
// Hace:
1. Recibe usuario a editar
2. Muestra formulario prellenado
3. Al enviar hace PUT a /api/usuarios/:id
4. Password es opcional
```

#### 6. `EliminarUsuario.js` - DELETE
**Función:** Botón para eliminar
```javascript
// Hace:
1. Muestra botón "Eliminar"
2. Pide confirmación
3. Hace DELETE a /api/usuarios/:id
4. Recarga lista
```

#### 7. `TablaUsuarios.js`
**Función:** Tabla completa con acciones
```javascript
// Hace:
1. Muestra tabla con todos los usuarios
2. Botón "Editar" para cada usuario
3. Usa componente EliminarUsuario para cada fila
4. Combina vista + acciones
```

---

## 🔄 Ejemplo Real

**Cuando el usuario crea un nuevo usuario:**

```
1. Usuario llena formulario en CrearUsuario.js
   ↓
2. Click en "Crear Usuario"
   ↓
3. CrearUsuario.js hace:
   axios.post('http://localhost:5001/api/usuarios', {
     nombre: 'Juan',
     email: 'juan@mail.com',
     password: '1234'
   })
   ↓
4. La petición llega a server.js (backend)
   ↓
5. server.js envía a usuarios.js
   ↓
6. usuarios.js ejecuta:
   INSERT INTO usuarios (nombre, email, password) 
   VALUES ('Juan', 'juan@mail.com', '1234')
   ↓
7. MySQL guarda el usuario
   ↓
8. usuarios.js devuelve:
   { message: 'Usuario creado exitosamente', user: {...} }
   ↓
9. CrearUsuario.js recibe respuesta
   ↓
10. Muestra mensaje y llama a onUsuarioCreado()
   ↓
11. UsersPage.js recarga la lista con GET
   ↓
12. Usuario ve el nuevo registro en la tabla
```

---

## ✅ Archivos Finales (Solo los necesarios)

### Backend (3 archivos)
- server.js
- config/database.js
- routes/usuarios.js

### Frontend (8 archivos)
- App.js
- pages/LoginPage.js
- pages/UsersPage.js
- components/CrearUsuario.js
- components/VerUsuarios.js
- components/EditarUsuario.js
- components/EliminarUsuario.js
- components/TablaUsuarios.js

**Total: 11 archivos principales**

Cada uno tiene una función clara y específica. No hay duplicados.
