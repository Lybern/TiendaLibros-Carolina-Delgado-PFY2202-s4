import { useCallback, useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router";
import Inicio from "./pages/Inicio";
import Libros from "./pages/Libros";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";

// ============================================================================
// FUNCIÓN AUXILIAR PARA CONSULTAR LIBROS Y GESTIONAR CÓDIGOS DE ESTADO HTTP
// Captura códigos 404, 500 y caídas de conexión para devolver mensajes legibles.
// Admite el parámetro signal para permitir la cancelación mediante AbortController.
// ============================================================================
async function obtenerLibros(categoria = "Todas", tipoError = "", signal) {
  let ruta =
    categoria === "Todas"
      ? "/api/books"
      : `/api/books?genre=${encodeURIComponent(categoria)}`;

  if (tipoError) {
    ruta += (ruta.includes("?") ? "&" : "?") + `error=${tipoError}`;
  }

  try {
    const respuesta = await fetch(ruta, { signal });

    // Si la respuesta no es exitosa (código fuera del rango 200-299)
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error(
          "No se encontraron los libros para la categoría solicitada (Error 404)."
        );
      }
      if (respuesta.status === 500) {
        throw new Error(
          "El servidor experimentó un fallo interno al procesar los libros (Error 500)."
        );
      }
      throw new Error("Ocurrió un error inesperado al consultar los datos.");
    }

    return await respuesta.json();
  } catch (error) {
    // Si la petición fue cancelada intencionalmente por AbortController, propagamos el error para no tratarlo como fallo de red
    if (error.name === "AbortError") {
      throw error;
    }

    // Si falla la red o se interrumpe la comunicación, se produce un TypeError
    if (error instanceof TypeError) {
      throw new Error(
        "No fue posible conectar con el servidor. Revisa tu conexión y vuelve a intentar."
      );
    }
    throw error;
  }
}

// Componente principal que define la navegación y las rutas de la aplicación
export default function App() {
  const [libros, setLibros] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Memorizamos la función con useCallback para evitar re-renderizados innecesarios en componentes hijos
  const cargarLibros = useCallback((categoria = "Todas", tipoError = "") => {
    setCategoriaActiva(categoria);
    setCargando(true);
    setError("");

    obtenerLibros(categoria, tipoError)
      .then((datos) => {
        setLibros(datos);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // Efecto inicial con AbortController para cancelar peticiones duplicadas u obsoletas
  useEffect(() => {
    const controller = new AbortController();

    obtenerLibros("Todas", "", controller.signal)
      .then((datos) => {
        setLibros(datos);
      })
      .catch((err) => {
        // Ignoramos la cancelación intencional del controlador
        if (err.name === "AbortError") {
          return;
        }
        setError(err.message);
      })
      .finally(() => {
        // Solo actualizamos el estado si la señal no fue abortada
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      });

    // Función de limpieza: aborta la petición si el componente se desmonta
    return () => {
      controller.abort();
    };
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
                cargando={cargando}
                error={error}
                categoriaActiva={categoriaActiva}
                cargarLibros={cargarLibros}
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
