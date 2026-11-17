# Tienda de Libros

**Estudiante:** Carolina Delgado  
**Proyecto:** Tienda de Libros  

---

## Descripción del Proyecto

Aplicación web desarrollada con **React** y empaquetada con **Vite**, orientada a la exploración de catálogos literarios interactivos. La aplicación se comunica con un backend simulado mediante **MSW (Mock Service Worker)** que intercepta llamadas HTTP tipo REST a nivel de navegador, incorporando navegación declarativa con **React Router**, gestión avanzada de estados de carga, manejo resiliente de errores HTTP y optimización de peticiones.

---

## Características Principales

### 1. Mock REST con Mock Service Worker (MSW)
* **Interceptación de red en el navegador:** Utiliza un Service Worker (`public/mockServiceWorker.js`) activado de forma asíncrona antes de montar la aplicación en desarrollo (`main.jsx`).
* **Endpoint `/api/books`:**
  * Soporta filtrado por género mediante parámetro de consulta (`?genre=Ficción`, `?genre=Ciencia Ficción`, etc.).
  * Si no se especifica género o se selecciona `"Todas"`, retorna el catálogo completo.
  * Simula una latencia de red realista de 1000 ms mediante `delay(1000)`.
  * Catálogo en memoria estructurado por géneros, incluyendo categorías con datos y categorías vacías (*Drama*) para validar el comportamiento visual.
  * Simula respuestas controladas para errores HTTP mediante `?error=404` y `?error=500`.

### 2. Navegación con React Router
* Configuración con `BrowserRouter`, `Routes`, `Route`, `NavLink` y `Link`.
* **Rutas implementadas:**
  * `/`: Portada de bienvenida con llamada a la acción hacia el catálogo.
  * `/libros`: Catálogo interactivo con filtrado dinámico por categorías.
  * `*`: Ruta comodín para capturar direcciones no encontradas (error 404 de navegación) y permitir retorno al inicio.
* Estructura semántica compartida con barra de navegación (`<header>`), cuerpo de contenido (`<main>`) y pie de página (`<footer>`).

### 3. Control de Carga y Retroalimentación Visual
* Estado reactivo `cargando` gestionado con `useState` y resuelto mediante bloque `.finally()`.
* Indicador visual accesible con atributo `role="status"` que notifica al usuario el procesamiento de la solicitud.
* Bloqueo de botones de categorías mediante la propiedad `disabled={cargando}` para evitar solicitudes múltiples y llamadas redundantes.
* Mensaje informativo ante categorías sin existencias disponibles.

### 4. Manejo de Errores y Solución Alternativa
* Verificación explícita de `response.ok` y códigos de estado HTTP (404 y 500), diferenciando fallos del servidor de caídas de conexión a nivel de red (`TypeError`).
* Visualización de alertas de error con atributo accesible `role="alert"`.
* **Solución alternativa (Resiliencia):** Botón **"Reintentar conexión"** que permite al usuario recuperar el estado sin recargar la página completa, conservando los últimos datos disponibles en memoria.
* Botones de prueba integrados para simular errores 404 y 500 directamente desde la interfaz.

### 5. Optimización de Rendimiento
* **`AbortController`:** Se integra en el ciclo de vida del componente principal (`useEffect`), pasando la señal de cancelación (`signal`) al `fetch`. Al desmontar el componente o cancelar la petición, se aborta la transferencia HTTP evitando condiciones de carrera (*race conditions*).
* **`useCallback`:** La función encargada de consultar los libros se memoriza para mantener una referencia estable en memoria y prevenir renderizados innecesarios en componentes secundarios.
* **Modularización:** Componente reutilizable `TarjetaLibro` con bajo acoplamiento para el renderizado individual de cada obra.

---

## Requisitos Previos

* **Node.js** (versión 18 o superior recomendada).
* **NPM** (versión 9 o superior).

---

## Instrucciones para Ejecutar el Proyecto

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/Lybern/TiendaLibros-Carolina-Delgado-PFY2202-s4.git
   cd TiendaLibros-Carolina-Delgado-PFY2202-s4
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Ingresar a la dirección indicada por la consola (generalmente `http://localhost:5173/`).

5. **Construcción para producción (opcional):**
   ```bash
   npm run build
   ```

---

## Estructura del Proyecto

```text
├── public/
│   └── mockServiceWorker.js       # Service Worker de MSW para interceptar peticiones
├── src/
│   ├── components/
│   │   └── TarjetaLibro.jsx       # Componente modular para cada tarjeta de libro
│   ├── mocks/
│   │   ├── browser.js             # Configuración del worker de MSW
│   │   └── handlers.js            # Definición de rutas mock, datos y retardos
│   ├── pages/
│   │   ├── Inicio.jsx             # Vista de bienvenida
│   │   ├── Libros.jsx             # Vista del catálogo con filtros y gestión de errores
│   │   └── PaginaNoEncontrada.jsx # Vista 404 para rutas inexistentes
│   ├── App.jsx                    # Layout principal, rutas y optimización de estado
│   ├── index.css                  # Estilos visuales de la aplicación
│   └── main.jsx                   # Punto de entrada y arranque asíncrono de MSW
├── package.json                   # Dependencias y scripts
└── README.md                      # Documentación del proyecto
```
