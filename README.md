# SubTracker — Gestor de Suscripciones (Frontend + Backend)

SubTracker es una aplicación completa para gestionar suscripciones mensuales/anuales, calcular gasto mensual, enviar alertas de vencimiento y visualizar estadísticas mediante gráficos.  
Incluye:

- ✔ Backend en **Node.js + Express + TypeScript + SQLite**
- ✔ Frontend en **Vue 3 + Vite + TypeScript + TailwindCSS**
- ✔ Modo oscuro, filtros, búsqueda, gráfico mensual y CRUD completo

---

#  Requisitos Previos

Asegúrate de tener instalado:

- **Node.js 18+**
- **npm**
- **Git** (opcional)
- **SQLite** (ya viene integrado, no se  necesita configurarlo)

---

# 📁 Estructura del Proyecto

```
subtracker-proyecto-final/
│── backend/
│   ├── src/
│   ├── database.sqlite
│   ├── package.json
│   └── tsconfig.json
│
│── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

#  Backend — Express + TypeScript + SQLite

##  1. Ir a la carpeta backend

```bash
cd backend
```

##  2. Instalar dependencias de TS, tipos de datos para node y prisma client

```bash
npm install
```


##  3. Ejecutar en modo desarrollo

```bash
npm run dev
```

##  Servidor backend disponible en:

```
http://localhost:4000
```

### Endpoints principales:

| Método | Ruta                          | Descripción |
|--------|-------------------------------|-------------|
| GET    | `/api/subscriptions`          | Obtener todas las suscripciones |
| POST   | `/api/subscriptions`          | Crear una suscripción |
| PUT    | `/api/subscriptions/:id`      | Actualizar |
| DELETE | `/api/subscriptions/:id`      | Eliminar |
| GET    | `/api/subscriptions/total`    | Total mensual en HNL |

---

# Frontend — Vue 3 + Vite + Tailwind

## 1. Ir a la carpeta frontend

```bash
cd frontend
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

## 📌 4. Abrir en el navegador

```
http://localhost:5173
```

TailwindCSS, modo oscuro, componentes y gráficas ya vienen configurados.

---

#  Conexión Frontend ↔ Backend

El proyecto ya está configurado para consumir la API:

📁 `frontend/src/api/subscriptions.ts`

```ts
const API_URL = "http://localhost:4000/api/subscriptions";
```

Si cambias el puerto o deseas usar producción, actualiza esa variable.

---

# 🗄 Base de Datos (SQLite)

La base se genera automáticamente al ejecutar el backend:

📂 `backend/database.sqlite`

No requiere instalación ni configuración adicional.

---

#  Scripts útiles

## Backend

| Comando         | Descripción |
|----------------|-------------|
| `npm run dev`  | Ejecuta en modo desarrollo |
| `npm start`    | Ejecuta la versión compilada |

## Frontend

| Comando         | Descripción |
|----------------|-------------|
| `npm run dev`  | Inicia servidor de desarrollo |
| `npm run preview` | Previsualiza la build |

---

#  Características Implementadas

- ✔ CRUD completo de suscripciones  
- ✔ Búsqueda y filtros  
- ✔ Conversión USD → HNL  
- ✔ Cálculo automático del gasto mensual  
- ✔ Modo claro/oscuro persistente  
- ✔ Gráfica mensual con Chart.js  
---

# Autor

**Yehudi Sanabria**
---