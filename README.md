# 🏗️ Skeleton Node.js Project

Este es un **esqueleto base para una aplicación Node.js** con TypeScript, ESLint, Prettier y Jest completamente configurados.
La configuración está optimizada para desarrollo **offline**, asegurando calidad en el código con herramientas de linting y pruebas automáticas.

---

## 📌 **Características**

✅ **Node.js v22** con TypeScript totalmente configurado.<br>
✅ **Soporte para ESLint y Prettier**, asegurando buenas prácticas y formateo automático.<br>
✅ **Jest para pruebas unitarias**, con cobertura de código y ejecución en modo `watch`.<br>
✅ **Scripts preconfigurados** en `package.json` para desarrollo ágil.<br>
✅ **Listo para instalar Express, Fastify u otro framework backend.**<br>

---

## 🚀 **Requisitos Previos**

Antes de usar este esqueleto, asegúrate de tener instalado:

- [Node.js 22+](https://nodejs.org/)
- [npm 10+](https://www.npmjs.com/) (incluido con Node.js)

---

## 🔧 **Instalación**

Clona este repositorio y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias tanto de desarrollo como de producción.

---

## 📂 **Estructura del Proyecto**

```plaintext
📦 skeleton-node
 ┣ 📂 src          # Código fuente
 ┣ 📂 tests        # Pruebas unitarias
 ┣ 📜 .eslintrc.json   # Configuración ESLint
 ┣ 📜 .prettierrc      # Configuración Prettier
 ┣ 📜 jest.config.js   # Configuración Jest
 ┣ 📜 tsconfig.json    # Configuración TypeScript
 ┣ 📜 package.json     # Configuración del proyecto
 ┣ 📜 README.md        # Este archivo
```

---

## 🛠️ **Comandos Útiles**

### 📌 **Ejecución de Linting y Formateo**

```bash
npm run lint       # Revisión de código con ESLint
npm run lint:fix   # Corrige errores de linting automáticamente
npm run format     # Verifica si el código sigue las reglas de Prettier
npm run format:fix # Formatea el código con Prettier
```

### 📌 **Ejecución de Pruebas**

```bash
npm run test       # Ejecuta todas las pruebas
npm run test:watch # Ejecuta pruebas en modo watch
npm run test:coverage # Genera reporte de cobertura de código
npm run test:verbose  # Muestra información detallada sobre las pruebas
```

---

## ⚙️ **Dependencias Clave**

### **📦 Dependencias de Producción**

| Paquete            | Versión  |
| ------------------ | -------- |
| `@tsconfig/node22` | 22.0.0   |
| `@types/node`      | 22.13.10 |
| `ts-node`          | 10.9.2   |
| `typescript`       | 5.8.2    |

### **🔧 Dependencias de Desarrollo**

| Paquete                  | Versión |
| ------------------------ | ------- |
| `eslint`                 | 9.22.0  |
| `eslint-config-prettier` | 10.1.1  |
| `eslint-plugin-jest`     | 28.11.0 |
| `eslint-plugin-prettier` | 5.2.3   |
| `jest`                   | 29.7.0  |
| `ts-jest`                | 29.2.6  |
| `prettier`               | 3.5.3   |

---

## 🔥 **Configuraciones Importantes**

### **📜 ESLint (`.eslintrc.json`)**

Este proyecto ya incluye **ESLint configurado con TypeScript y Prettier**. Algunas reglas clave:

- **`@typescript-eslint/no-unused-vars`**: Muestra advertencias si hay variables no usadas.
- **`@typescript-eslint/no-explicit-any`**: Evita el uso de `any`.
- **`prefer-const`**: Requiere `const` en lugar de `let` cuando la variable no cambia.
- **`no-console`**: Permite `console.warn` y `console.error`, pero muestra advertencia en `console.log`.

### **🎨 Prettier (`.prettierrc`)**

- Usa **doble comillas** para cadenas.
- Aplica **espaciado uniforme y sangría de 2 espacios**.

### **🧪 Jest (`jest.config.js`)**

- **Transforma TypeScript automáticamente con `ts-jest`**.
- **Ejecuta pruebas dentro de la carpeta `tests/`**.
- **Genera cobertura de código con `jest --coverage`**.

---

## 🔌 **Siguientes Pasos**

Después de la instalación, puedes empezar a agregar dependencias como **Express** para desarrollar tu API:

```bash
npm install express
```

Si usas TypeScript, instala los tipos para Express:

```bash
npm install @types/express --save-dev
```

---

## 🎯 **Conclusión**

Este esqueleto de Node.js con TypeScript te permite **iniciar rápidamente un proyecto** con las mejores prácticas en linting, formateo y pruebas.

🚀 **¡Ahora solo instala tus dependencias y comienza a desarrollar!**
