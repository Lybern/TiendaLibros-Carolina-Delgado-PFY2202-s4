import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.js";

// ============================================================================
// CONFIGURACIÓN DEL SERVICE WORKER EN EL NAVEGADOR
// setupWorker toma la lista de handlers definidos y los registra en el
// Service Worker (public/mockServiceWorker.js) para interceptar solicitudes
// HTTP locales antes de que salgan a internet.
// Nota importante de la clase: En Vite (ES Modules) es buena práctica poner la
// extensión .js explícita para evitar fallos de resolución en el navegador.
// ============================================================================
export const worker = setupWorker(...handlers);
