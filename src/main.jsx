import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";

// ============================================================================
// INICIALIZACIÓN ASÍNCRONA DE LA APLICACIÓN
// Esta función asegura que el interceptor (Service Worker) esté completamente
// activo antes de que React dibuje la interfaz y empiece a solicitar datos.
// ============================================================================
async function iniciarAplicacion() {
  // Solo en entorno de desarrollo activamos la interceptación de peticiones
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.js");
    await worker.start({
      // "bypass" permite que las solicitudes a imágenes, CSS y fuentes pasen de largo sin ser bloqueadas
      onUnhandledRequest: "bypass",
    });
  }

  // Una vez que el interceptor está listo, dibujamos la aplicación en el navegador
  createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// Ejecutamos el inicio de la aplicación y capturamos cualquier fallo imprevisto
iniciarAplicacion().catch((error) => {
  console.error("Ocurrió un error al iniciar la aplicación:", error);
  document.getElementById("root").textContent =
    "No fue posible iniciar la aplicación. Revisa la consola del navegador.";
});
