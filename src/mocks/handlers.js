import { http, HttpResponse, delay } from "msw";
import { CATEGORIAS_DISPONIBLES } from "../constants/categorias.js";

export { CATEGORIAS_DISPONIBLES };

// ============================================================================
// DATOS SIMULADOS ORGANIZADOS POR GÉNERO (booksByGenre)
// Cada categoría contiene una lista de libros con sus datos principales.
// La categoría "Drama" se deja vacía intencionalmente para comprobar cómo
// responde la interfaz cuando una categoría no contiene libros disponibles.
// ============================================================================
export const booksByGenre = {
  "Ficción": [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      price: 12990,
      description: "Novela distópica sobre la vigilancia y el control del pensamiento.",
    },
    {
      id: 2,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: 16990,
      description: "Historia de la familia Buendía en el pueblo ficticio de Macondo.",
    },
  ],
  "Ciencia Ficción": [
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      price: 21990,
      description: "Novela de ciencia ficción ambientada en el planeta desértico Arrakis.",
    },
    {
      id: 4,
      title: "Fundación",
      author: "Isaac Asimov",
      price: 14990,
      description: "Un científico utiliza la psicohistoria para prever la caída de un imperio.",
    },
  ],
  "Misterio": [
    {
      id: 5,
      title: "Las aventuras de Sherlock Holmes",
      author: "Arthur Conan Doyle",
      price: 11990,
      description: "Colección de relatos protagonizados por el detective Sherlock Holmes.",
    },
    {
      id: 6,
      title: "Asesinato en el Orient Express",
      author: "Agatha Christie",
      price: 13990,
      description: "Un detective debe resolver un crimen cometido dentro de un tren de lujo.",
    },
  ],
  "Fantasía": [
    {
      id: 7,
      title: "El Señor de los Anillos: La Comunidad del Anillo",
      author: "J. R. R. Tolkien",
      price: 22990,
      description: "Un grupo de héroes emprende una misión para destruir un anillo de gran poder.",
    },
    {
      id: 8,
      title: "El nombre del viento",
      author: "Patrick Rothfuss",
      price: 19990,
      description: "Un mago legendario narra su propia historia desde su juventud errante.",
    },
  ],
  // Categoría vacía para probar el estado sin libros:
  "Drama": [],
};

// ============================================================================
// INTERCEPTOR DE PETICIONES HTTP
// Captura las llamadas a "/api/books" y devuelve los datos según los parámetros recibidos.
// ============================================================================
export const handlers = [
  http.get("/api/books", async ({ request }) => {
    // Simulamos un retraso de 1 segundo para observar el estado de carga en la pantalla
    await delay(1000);

    // Leemos los parámetros que vienen en la dirección URL
    const url = new URL(request.url);
    const genre = url.searchParams.get("genre");
    const errorSimulado = url.searchParams.get("error");

    // Respuestas controladas para probar la reacción ante errores del servidor
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

    // Si se especifica una categoría en la consulta:
    if (genre && genre !== "Todas") {
      // Si la categoría no existe en los registros, retornamos código 404
      if (!Object.prototype.hasOwnProperty.call(booksByGenre, genre)) {
        return HttpResponse.json(
          { message: `La categoría '${genre}' no existe en el catálogo.` },
          { status: 404 }
        );
      }

      // Si existe, retornamos los libros correspondientes a esa categoría
      return HttpResponse.json(booksByGenre[genre], { status: 200 });
    }

    // Si no se indica categoría o se solicita "Todas", devolvemos la lista completa
    const todosLosLibros = Object.values(booksByGenre).flat();
    return HttpResponse.json(todosLosLibros, { status: 200 });
  }),
];
