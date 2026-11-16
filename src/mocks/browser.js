import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.js";

// ============================================================================
// CONFIGURACIÓN DEL SERVICE WORKER EN EL NAVEGADOR
// setupWorker registra las reglas de interceptación definidas en handlers.js
// dentro del Service Worker del navegador (mockServiceWorker.js).
// Al incluir la extensión .js evitamos problemas de resolución de módulos nativos.
// ============================================================================
export const worker = setupWorker(...handlers);
