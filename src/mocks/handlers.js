import { http, HttpResponse, delay } from "msw";

// ============================================================================
// 1. LISTA DE CATEGORÍAS DISPONIBLES
// Exportamos esta lista para que los componentes de React puedan crear
// los botones o enlaces de navegación de forma dinámica.
// ============================================================================
export const CATEGORIAS_DISPONIBLES = [
  "Ficción",
  "Ciencia Ficción",
  "Misterio",
  "Fantasía",
  "Drama",
];

// ============================================================================
// 2. DATOS SIMULADOS ORGANIZADOS POR GÉNERO (booksByGenre)
// Siguiendo la Guía de Duoc:
//  - Cada libro tiene título, autor y precio.
//  - "Drama" se deja con un arreglo vacío [] intencionalmente para evaluar
//    cómo reacciona la interfaz cuando no existen libros en una categoría.
// ============================================================================
export const booksByGenre = {
  "Ficción": [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      price: 12990,
      description: "Novela distópica sobre la vigilancia y el control totalitario.",
    },
    {
      id: 2,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: 16990,
      description: "Obra cumbre del realismo mágico y la saga de la familia Buendía.",
    },
  ],
  "Ciencia Ficción": [
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      price: 21990,
      description: "Epopeya intergaláctica en el planeta desértico Arrakis.",
    },
    {
      id: 4,
      title: "Fundación",
      author: "Isaac Asimov",
      price: 14990,
      description: "La psicohistoria y el esfuerzo por preservar el saber galáctico.",
    },
  ],
  "Misterio": [
    {
      id: 5,
      title: "Las aventuras de Sherlock Holmes",
      author: "Arthur Conan Doyle",
      price: 11990,
      description: "Casos clásicos del legendario detective de Baker Street.",
    },
    {
      id: 6,
      title: "Asesinato en el Orient Express",
      author: "Agatha Christie",
      price: 13990,
      description: "El detective Hércules Poirot busca al culpable en un tren varado.",
    },
  ],
  "Fantasía": [
    {
      id: 7,
      title: "El Señor de los Anillos: La Comunidad del Anillo",
      author: "J. R. R. Tolkien",
      price: 22990,
      description: "El inicio del épico viaje para destruir el Anillo Único.",
    },
    {
      id: 8,
      title: "El nombre del viento",
      author: "Patrick Rothfuss",
      price: 19990,
      description: "Las memorias del legendario mago y músico Kvothe.",
    },
  ],
  // Categoría vacía requerida por la Guía de Aprendizaje Duoc:
  "Drama": [],
};

// ============================================================================
// 3. HANDLERS DE INTERCEPTACIÓN HTTP CON MSW
// Aquí definimos las rutas que el Service Worker va a capturar.
// ============================================================================
export const handlers = [
  // Interceptamos peticiones GET a "/api/books"
  http.get("/api/books", async ({ request }) => {
    // A) Simulación de latencia de red:
    // Pausamos la ejecución por 1000 milisegundos (1 segundo) para que
    // en el frontend se pueda apreciar el indicador de carga (loading spinner).
    await delay(1000);

    // B) Lectura de parámetros en la URL (Query Params):
    const url = new URL(request.url);
    const genre = url.searchParams.get("genre");
    const errorSimulado = url.searchParams.get("error");

    // C) Simulación manual de errores HTTP (para evaluar la Pauta de errores):
    if (errorSimulado === "500") {
      return HttpResponse.json(
        { message: "Error interno del servidor simulado (500)" },
        { status: 500 }
      );
    }

    if (errorSimulado === "404") {
      return HttpResponse.json(
        { message: "Recurso no encontrado simulado (404)" },
        { status: 404 }
      );
    }

    // D) Si el usuario solicitó un género específico:
    if (genre && genre !== "Todas") {
      // Si el género no existe en nuestra base de datos simulada:
      if (!Object.prototype.hasOwnProperty.call(booksByGenre, genre)) {
        return HttpResponse.json(
          { message: `El género '${genre}' no fue encontrado.` },
          { status: 404 }
        );
      }

      // Si el género existe, devolvemos su arreglo (incluso si está vacío como Drama)
      return HttpResponse.json(booksByGenre[genre], { status: 200 });
    }

    // E) Si no se especifica género o se pide "Todas", entregamos todos los libros:
    const todosLosLibros = Object.values(booksByGenre).flat();
    return HttpResponse.json(todosLosLibros, { status: 200 });
  }),
];
