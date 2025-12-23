# Sistema de Gestión de Préstamos

## Descripción General

Este proyecto es un sistema backend desarrollado en Node.js con Express y Sequelize, diseñado para administrar clientes, tasas del dólar, préstamos y pagos. Incluye autenticación mediante JWT, validaciones con express-validator, manejo global de errores, generación de reportes en PDF y documentación completa utilizando Swagger.

El objetivo del sistema es proporcionar una API sólida, segura y escalable que permita gestionar operaciones financieras básicas y mantener un historial detallado de todos los movimientos.

## Características Principales

- **API REST** desarrollada en Express
- **ORM Sequelize** conectado a MySQL
- **Autenticación** mediante JSON Web Tokens (JWT)
- **Encriptación de contraseñas** con bcrypt
- **Validaciones avanzadas** utilizando express-validator
- **CRUD completo** para:
  - Clientes
  - Tasas del dólar
  - Préstamos
  - Pagos
  - Usuarios (Solo Admin)
- **Reglas automáticas de negocio**:
  - Cálculo automático de intereses
  - Actualización automática del estado del préstamo
  - Recálculo de saldos pendientes con cada pago
- **Generación de reportes PDF** con PDFKit
- **Documentación interactiva** con Swagger UI
- **Manejo global y uniforme de errores**

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** v5.1.0 - Framework web
- **Sequelize** v6.37.7 - ORM para MySQL
- **MySQL2** v3.15.3 - Driver de base de datos
- **JWT** (jsonwebtoken v9.0.2) - Autenticación
- **bcrypt** v6.0.0 - Encriptación de contraseñas
- **express-validator** v7.3.1 - Validaciones
- **swagger-jsdoc** v6.2.8 - Generación de documentación
- **swagger-ui-express** v5.0.1 - Interfaz de Swagger
- **PDFKit** v0.17.2 - Generación de reportes PDF
- **Morgan** v1.10.1 - Logger HTTP
- **CORS** v2.8.5 - Manejo de CORS
- **dotenv** v17.2.3 - Variables de entorno

## Estructura del Proyecto

```
/src
 ├── config/
 │    ├── database.js          # Configuración de Sequelize y MySQL
 │    └── swagger.js            # Configuración de Swagger
 ├── controllers/
 │    ├── auth.controller.js
 │    ├── cliente.controller.js
 │    ├── estadoCuenta.controller.js
 │    ├── pagos.controller.js
 │    ├── pdf.controller.js
 │    ├── prestamo.controller.js
 │    └── tasa.controller.js
 ├── docs/
 │    └── schemas.js            # Schemas de Swagger centralizados
 ├── middlewares/
 │    ├── auth.middleware.js    # Verificación de JWT
 │    ├── error.handler.js      # Manejo global de errores
 │    ├── handleValidation.js   # Procesamiento de validaciones
 │    └── notFound.js           # Manejo de rutas no encontradas
 ├── models/
 │    ├── cliente.model.js
 │    ├── index.js              # Relaciones entre modelos
 │    ├── pago.model.js
 │    ├── prestamo.model.js
 │    ├── tasa.model.js
 │    └── usuario.model.js
 ├── routes/
 │    ├── auth.routes.js
 │    ├── cliente.routes.js
 │    ├── estadoCuenta.routes.js
 │    ├── index.js              # Enrutador principal
 │    ├── pagos.routes.js
 │    ├── pdf.routes.js
 │    ├── prestamo.routes.js
 │    └── tasa.routes.js
 ├── utils/
 │    ├── generarPdfGeneral.js
 │    ├── generarPdfPagados.js
 │    └── generarPdfPendientes.js
 ├── validators/
 │    ├── auth.validator.js
 │    ├── cliente.validator.js
 │    ├── pago.validator.js
 │    ├── prestamo.validator.js
 │    └── tasa.validator.js
 └── app.js                     # Configuración de Express
server.js                       # Punto de entrada de la aplicación
.env                            # Variables de entorno
```

### Descripción de Directorios

- **config**: Configuraciones base como conexión a la base de datos y Swagger
- **controllers**: Lógica de negocio de cada módulo
- **docs**: Documentación de Swagger (schemas)
- **middlewares**: Middlewares personalizados (errores, validaciones, autenticación)
- **models**: Modelos de Sequelize y relaciones
- **routes**: Definición de endpoints organizados por entidad
- **utils**: Funciones auxiliares y generadores de PDF
- **validators**: Validaciones con express-validator

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/sistema-prestamos-backend.git
cd sistema-prestamos-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=prestamos_db
DB_PORT=3306

# JWT
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRES_IN=24h # Clave opcional, por defecto es 24h

# Servidor
PORT=4000
```

### 4. Crear la base de datos

```sql
CREATE DATABASE prestamos_db;
```

### 5. Ejecutar el servidor

El proyecto está configurado para crear las tablas automáticamente mediante Sequelize al iniciar:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

## Endpoints Principales

### Base URL

```
http://localhost:4000/api
```

### 1. Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Registrar nuevo usuario | No |
| POST | `/auth/login` | Iniciar sesión y obtener token JWT | No |

**Ejemplo de registro:**

```json
POST /api/auth/register
{
  "nombre": "Admin Principal",
  "cedula": "V-12345678",
  "password": "password123",
  "rol": "admin"
}
```

**Ejemplo de login:**

```json
POST /api/auth/login
{
  "cedula": "V-12345678",
  "password": "password123"
}
```

### 2. Clientes

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/clientes` | Crear nuevo cliente | JWT |
| GET | `/clientes` | Listar todos los clientes | JWT |
| PUT | `/clientes/:id` | Actualizar cliente | JWT |
| DELETE | `/clientes/:id` | Eliminar cliente | JWT |
| GET | `/clientes/:id/prestamos` | Obtener préstamos de un cliente | JWT |

**Ejemplo de creación:**

```json
POST /api/clientes
{
  "nombre": "Juan Pérez",
  "cedula": "V-87654321",
  "telefono": "+58 412-1234567"
}
```

### 3. Tasas del Dólar

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/tasas` | Registrar nueva tasa | JWT |
| GET | `/tasas` | Listar todas las tasas | JWT |
| PUT | `/tasas/:id` | Actualizar tasa | JWT |

**Ejemplo:**

```json
POST /api/tasas
{
  "valor": 36.50,
  "fecha": "2024-11-24T21:00:00Z"
}
```

### 4. Préstamos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/prestamos` | Crear nuevo préstamo | JWT |
| GET | `/prestamos` | Listar todos los préstamos | JWT |
| PUT | `/prestamos/:id` | Actualizar préstamo | JWT |
| DELETE | `/prestamos/:id` | Eliminar préstamo | JWT |

**Reglas automáticas:**

- Cálculo automático de monto total (capital + intereses)
- Control de saldo pendiente
- Estado cambia automáticamente a "pagado" cuando el saldo llega a cero

**Ejemplo:**

```json
POST /api/prestamos
{
  "clienteId": 1,
  "montoPrestado": 1000.00,
  "porcentaje": 10.5,
  "tasaId": 1
}
```

### 5. Pagos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/pagos` | Registrar nuevo pago | JWT |
| GET | `/pagos` | Listar todos los pagos | JWT |
| GET | `/pagos/pago/:id` | Obtener pago por ID | JWT |
| GET | `/pagos/prestamo/:prestamoId` | Listar pagos de un préstamo | JWT |
| PUT | `/pagos/:id` | Actualizar pago | JWT |
| DELETE | `/pagos/:id` | Eliminar pago | JWT |

**Reglas:**

- Recálculo automático del saldo restante
- Actualización automática del estado del préstamo
- Validación de que el monto no exceda el saldo pendiente

**Ejemplo:**

```json
POST /api/pagos
{
  "prestamoId": 1,
  "monto": 250.00,
  "fechaPago": "2024-11-24T21:00:00Z"
}
```

### 6. Estado de Cuenta

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/estado-cuenta/pendientes` | Préstamos con saldo pendiente | JWT |
| GET | `/estado-cuenta/pagados` | Préstamos completamente pagados | JWT |
| GET | `/estado-cuenta/totales` | Totales y estadísticas generales | JWT |

### 7. Generación de PDF

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/pdf/pendientes` | PDF de préstamos pendientes | JWT |
| GET | `/pdf/pagados` | PDF de préstamos pagados | JWT |
| GET | `/pdf/general` | PDF de reporte general | JWT |

### 8. Gestión de Usuarios (Solo Admin)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/usuarios` | Listar todos los usuarios | JWT + Admin |
| GET | `/usuarios/:id` | Ver detalle de usuario | JWT + Admin |
| POST | `/usuarios` | Crear nuevo usuario | JWT + Admin |
| PUT | `/usuarios/:id` | Actualizar usuario (Rol, Pass, Datos) | JWT + Admin |
| DELETE | `/usuarios/:id` | Eliminar usuario | JWT + Admin |

Los PDFs se generan automáticamente y se descargan en el navegador.

## Validaciones

Se utiliza `express-validator` para garantizar la integridad de los datos:

- **Campos obligatorios** verificados
- **Cédulas** con formato válido
- **Montos** positivos y numéricos
- **Tasas** válidas
- **IDs** existentes en la base de datos

**Ejemplo de validación:**

```javascript
body("montoPrestado")
  .isFloat({ min: 1 })
  .withMessage("El monto debe ser mayor a 0")
```

## Manejo Global de Errores

El middleware `errorHandler.js` unifica todas las respuestas de error para garantizar un formato consistente:

```json
{
  "error": true,
  "mensaje": "Descripción del error"
}
```

También se incluye un middleware `notFound.js` para rutas inexistentes:

```json
{
  "error": true,
  "mensaje": "La ruta /api/ruta-inexistente no existe en este servidor."
}
```

## Autenticación JWT

Para acceder a los endpoints protegidos, debes incluir el token JWT en el header de la petición:

```
Authorization: Bearer <tu_token_jwt>
```

**Ejemplo con curl:**

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:4000/api/clientes
```

## Documentación Swagger

Una vez el servidor está en ejecución, la documentación completa e interactiva está disponible en:

```
http://localhost:4000/api-docs
```

La documentación incluye:

- Todos los endpoints organizados por tags
- Schemas de todos los modelos
- Ejemplos de request y response
- Posibilidad de probar los endpoints directamente desde el navegador
- Autenticación JWT integrada (botón "Authorize")

### Cómo usar Swagger UI

1. Accede a `http://localhost:4000/api-docs`
2. Haz login en `/auth/login` para obtener tu token
3. Haz clic en el botón "Authorize" en la parte superior
4. Ingresa tu token en el formato: `Bearer <tu_token>`
5. Ahora puedes probar todos los endpoints protegidos

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Ejecutar el servidor en modo desarrollo con nodemon |
| `npm start` | Ejecutar el servidor en modo producción |

## Modelos de Base de Datos

### Usuario

- `id` (PK)
- `nombre`
- `cedula` (UNIQUE)
- `password` (hasheado)
- `rol` (admin, operador)

### Cliente

- `id` (PK)
- `nombre`
- `cedula` (UNIQUE)
- `telefono`

### Tasa

- `id` (PK)
- `valor`
- `fecha`

### Prestamo

- `id` (PK)
- `clienteId` (FK)
- `montoPrestado`
- `porcentaje`
- `montoTotal`
- `saldoPendiente`
- `tasaUsada`
- `estado` (pendiente, pagado)
- `fechaRegistro`

### Pago

- `id` (PK)
- `prestamoId` (FK)
- `monto`
- `fechaPago`

## Relaciones

- **Cliente** tiene muchos **Préstamos** (1:N)
- **Préstamo** tiene muchos **Pagos** (1:N)
- **Préstamo** pertenece a un **Cliente** (N:1)
- **Pago** pertenece a un **Préstamo** (N:1)

## Contribución

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

ISC

## Autor

Jorge Escalonas

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades, por favor abre un issue en el repositorio.
