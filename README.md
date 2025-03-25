
# 🚚 Backend - Prueba Técnica Coordinadora

Esta es una **prueba técnica** para Coordinadora, donde se desarrolla un backend funcional utilizando tecnologías modernas como **Node.js**, **WebSocket (Socket.IO)**, **Redis** y **MySQL**. El sistema permite gestionar órdenes de envío, actualizaciones en tiempo real, caché optimizado y más.

---

## ⚙️ Configuración Rápida

1. **Levantar MySQL con Docker:**
```bash
docker run --name task-manager-db -e MYSQL_ROOT_PASSWORD=rootPass123 -e MYSQL_DATABASE=task_manager -e MYSQL_USER=task_user -e MYSQL_PASSWORD=taskPass456 -p 3306:3306 -d mysql:8.0
```

2. **Levantar Redis con Docker:**
```bash
docker run --name redis -p 6379:6379 -d redis
```

3. **Instalar dependencias del proyecto:**
```bash
npm install
```


3. **Script del proyecto:**

> 📁 Dentro de `src/data` encontrarás el script SQL necesario para crear las tablas y relaciones de la base de datos.  
> Puedes importarlo directamente en tu cliente MySQL favorito o mediante línea de comandos.
---


## 📁 Estructura de carpetas

```
src/
├── application/           # Lógica de aplicación (DTOs, casos de uso, validaciones)
│   ├── dto/
│   ├── use-cases/
│   └── validators/
├── config/                # Configuración general del sistema (env, Redis, DB)
├── data/                  # Scripts de base de datos para la respectiva importación coord_bd.sql
├── docs/                  # Documentación Swagger y especificaciones
├── domain/                # Entidades, enums e interfaces del dominio
│   ├── entities/
│   ├── enums/
│   └── interfaces/
├── infrastructure/        # Implementaciones concretas: auth, caché, DB, etc.
│   ├── auth/
│   ├── cache/
│   └── database/
├── interfaces/            # Interfaces de entrada/salida (HTTP, WebSocket)
├── shared/                # Recursos compartidos entre módulos
├── app.ts                 # Configuración principal de la app
└── index.ts               # Punto de entrada de la aplicación

tests/                     # Pruebas unitarias y de integración
.env                       # Variables de entorno del proyecto
```
