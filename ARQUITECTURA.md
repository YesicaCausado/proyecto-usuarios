# Explicación de la Arquitectura del Proyecto

## ¿Por qué necesitamos archivos en Backend Y Frontend?

### 🖥️ BACKEND (Node.js + Express)
**Ubicación:** `backend/routes/usuarios.js`

**Función:** Es el SERVIDOR que:
- Se conecta a la BASE DE DATOS (MySQL)
- Ejecuta las CONSULTAS SQL
- Valida los datos
- Devuelve respuestas en formato JSON

**Sin este archivo NO FUNCIONA porque:**
- No habría quien hable con la base de datos
- No existirían los endpoints (URLs) de la API
- El frontend no tendría a quién pedirle datos

### 💻 FRONTEND (React)
**Ubicación:** `frontend/src/components/`

**Función:** Es la INTERFAZ que:
- Muestra formularios y botones al usuario
- Envía peticiones HTTP al backend
- Muestra los resultados en pantalla

**Sin estos archivos NO FUNCIONA porque:**
- No habría interfaz visual para el usuario
- No habría forma de interactuar con el sistema

## 📊 Flujo de Datos Completo

```
1. Usuario hace click en "Crear Usuario"
   ↓
2. CrearUsuario.js (FRONTEND)
   - Toma los datos del formulario
   - Hace: axios.post('http://localhost:5001/api/usuarios', datos)
   ↓
3. server.js (BACKEND)
   - Recibe la petición HTTP
   - La envía a usuarios.js
   ↓
4. usuarios.js (BACKEND)
   - Valida los datos
   - Ejecuta: INSERT INTO usuarios (nombre, email, password) VALUES (...)
   - Habla directamente con MySQL
   ↓
5. database.js (BACKEND)
   - Conexión activa a MySQL
   - Ejecuta la consulta
   ↓
6. MySQL guarda el usuario
   ↓
7. usuarios.js devuelve respuesta JSON: { message: "Usuario creado", user: {...} }
   ↓
8. CrearUsuario.js (FRONTEND) recibe la respuesta
   - Muestra mensaje "Usuario creado exitosamente"
   - Recarga la lista
```

## 🗂️ Archivos Estrictamente Necesarios

### Backend (3 archivos)
```
backend/
├── server.js           ✅ Inicia el servidor
├── config/
│   └── database.js     ✅ Conexión a MySQL
└── routes/
    └── usuarios.js     ✅ Rutas CRUD + Login
```

### Frontend (6 componentes + 2 páginas)
```
frontend/src/
├── App.js                      ✅ Rutas principales
├── pages/
│   ├── LoginPage.js            ✅ Página de login
│   └── UsersPage.js            ✅ Página de gestión
└── components/
    ├── CrearUsuario.js         ✅ CREATE
    ├── VerUsuarios.js          ✅ READ (solo vista)
    ├── EditarUsuario.js        ✅ UPDATE
    ├── EliminarUsuario.js      ✅ DELETE
    └── TablaUsuarios.js        ✅ Tabla con acciones
```

## ❓ ¿Son Duplicados?

**NO.** Son complementarios:

| Backend (usuarios.js) | Frontend (componentes) |
|----------------------|------------------------|
| Ejecuta SQL en MySQL | Muestra formularios HTML |
| Valida en el servidor | Valida en el navegador |
| Devuelve JSON | Muestra datos bonitos |
| Es el "cerebro" | Es la "cara" |

## 🔄 Analogía

Imagina un restaurante:

- **Backend** = Cocina
  - Tiene acceso a la despensa (base de datos)
  - Prepara la comida (procesa datos)
  - Solo los cocineros pueden entrar (seguridad)

- **Frontend** = Meseros + Carta
  - El cliente ve la carta (interfaz)
  - El mesero toma la orden (envía petición)
  - Lleva la comida a la mesa (muestra resultados)

**Los dos son necesarios.** Sin cocina no hay comida. Sin meseros no hay forma de pedirla.

## 📝 Resumen

**backend/routes/usuarios.js** → Es NECESARIO porque es quien ejecuta las consultas SQL
**frontend/src/components/** → Son NECESARIOS porque son la interfaz que usa el usuario

**No están duplicados, trabajan juntos:**
Frontend llama → Backend ejecuta → Frontend muestra
