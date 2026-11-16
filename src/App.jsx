import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router";
import Inicio from "./pages/Inicio";
import Libros from "./pages/Libros";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";

// Componente principal que define la navegación y las rutas de la aplicación
export default function App() {
  const [libros, setLibros] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  // Función para consultar libros al servicio mock según la categoría seleccionada
  function cargarLibros(categoria = "Todas") {
    setCategoriaActiva(categoria);
    const ruta =
      categoria === "Todas"
        ? "/api/books"
        : `/api/books?genre=${encodeURIComponent(categoria)}`;

    fetch(ruta)
      .then((respuesta) => respuesta.json())
      .then((datos) => setLibros(datos))
      .catch((error) =>
        console.error("Error al obtener los libros:", error)
      );
  }

  // Al cargar la aplicación por primera vez, solicitamos todos los libros
  useEffect(() => {
    cargarLibros("Todas");
  }, []);

  return (
    <div className="contenedor">
      {/* Barra de navegación superior */}
      <header>
        <nav aria-label="Navegación principal">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/libros">Catálogo de Libros</NavLink>
        </nav>
      </header>

      {/* Contenido dinámico según la ruta */}
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/libros"
            element={
              <Libros
                libros={libros}
                categoriaActiva={categoriaActiva}
                cambiarCategoria={cargarLibros}
              />
            }
          />
          {/* Ruta comodín para capturar cualquier enlace no registrado */}
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
    </div>
  );
}
