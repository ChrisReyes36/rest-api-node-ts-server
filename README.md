# REST API Node TypeScript Server

API REST desarrollada con Node.js, Express, TypeScript, Sequelize y PostgreSQL para la gestión de productos.

## Tecnologías

* Node.js
* TypeScript
* Express
* PostgreSQL
* Sequelize
* Sequelize Typescript
* Zod
* Docker Compose

---

## Estructura del proyecto

```text
src/
├── config/         # Configuración general (DB, variables de entorno, etc.)
├── handlers/       # Controladores de las rutas
├── middlewares/    # Middlewares personalizados
├── models/         # Modelos de Sequelize
├── routers/        # Definición de rutas
├── index.ts        # Punto de entrada de la aplicación
└── server.ts       # Configuración del servidor Express
```

---

## Variables de entorno

Crear un archivo `.env` basado en `.env.example`.

```env
DB_HOST=localhost
DB_PORT=5439
DB_DB=rest_api_products
DB_USER=admin
DB_PASSWORD=admin

APP_PORT=4000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173
```

---

## Instalación

Clonar el repositorio:

```bash
git clone <repository-url>
cd rest-api-node-ts-server
```

Instalar dependencias:

```bash
yarn install
```

---

## Levantar PostgreSQL con Docker

```bash
docker compose up -d
```

Verificar contenedores:

```bash
docker ps
```

Detener servicios:

```bash
docker compose down --volumes
```

---

## Ejecutar en desarrollo

```bash
yarn dev
```

La API estará disponible en:

```text
http://localhost:4000
```

---

## Modelo Product

```ts
{
  id: number;
  name: string;
  price: number;
  availability: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
```

---

## Endpoints

### Obtener productos

```http
GET /api/v1/products
```

Respuesta:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 1200,
    "availability": true
  }
]
```

---

### Obtener producto por ID

```http
GET /api/v1/products/:id
```

---

### Crear producto

```http
POST /api/v1/products
```

Body:

```json
{
  "name": "Laptop",
  "price": 1200,
  "availability": true
}
```

---

### Actualizar producto

```http
PUT /api/v1/products/:id
```

Body:

```json
{
  "name": "Laptop Gamer",
  "price": 1500,
  "availability": true
}
```

---

### Actualizar disponibilidad

```http
PATCH /api/v1/products/:id/availability
```

---

### Eliminar producto

```http
DELETE /api/v1/products/:id
```

---

## Validaciones

La aplicación utiliza Zod y Express Validator para:

* Validar variables de entorno.
* Validar parámetros de rutas.
* Validar cuerpos de petición.

---

## Scripts

### Desarrollo

```bash
yarn dev
```

### Compilar TypeScript

```bash
yarn build
```

---

## Autor

Christopher Alberto Muñoz Reyes
