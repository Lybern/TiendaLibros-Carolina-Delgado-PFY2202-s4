import { useState } from "react";
import { CATEGORIAS_DISPONIBLES } from "../constants/categorias.js";
import TarjetaLibro from "../components/TarjetaLibro.jsx";

// Componente de página para visualizar el catálogo y filtrar por categorías y texto
export default function Libros({
  libros = [],
  cargando = false,
  error = "",
  categoriaActiva = "Todas",
  cargarLibros,
}) {
  // Estado local para el filtro de búsqueda por texto en tiempo real
  const [busqueda, setBusqueda] = useState("");

  // Centralizamos las categorías combinando la opción general "Todas" con las constantes compartidas
  const categorias = ["Todas", ...CATEGORIAS_DISPONIBLES];

  // Filtramos la colección en memoria usando una función pura según el texto ingresado
  const librosFiltrados = libros.filter((libro) => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) {
      return true;
    }
    return (
      libro.title.toLowerCase().includes(termino) ||
      libro.author.toLowerCase().includes(termino)
    );
  });

  return (
    <section>
      <div className="encabezado-catalogo">
        <h1>Catálogo de Libros</h1>
        <p>Explora nuestras obras por género o busca por título o autor:</p>
      </div>

      {/* Barra de búsqueda interactiva */}
      <div className="contenedor-busqueda">
        <input
          type="search"
          placeholder="🔍 Buscar por título o autor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          disabled={cargando}
          className="campo-busqueda"
          aria-label="Buscar libros por título o autor"
        />
        {busqueda && (
          <button
            type="button"
            onClick={() => setBusqueda("")}
            className="boton-limpiar-busqueda"
            title="Limpiar búsqueda"
          >
            &times;
          </button>
        )}
      </div>

      {/* Botones para alternar entre categorías */}
      <div className="acciones">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => cargarLibros && cargarLibros(cat)}
            disabled={cargando}
            className={categoriaActiva === cat ? "boton-activo" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Botones para comprobar el control y manejo de errores del servidor */}
      <div className="acciones-errores">
        <span>Pruebas de errores HTTP:</span>
        <button
          type="button"
          onClick={() => cargarLibros && cargarLibros(categoriaActiva, "404")}
          disabled={cargando}
          className="boton-simular"
        >
          Simular error 404
        </button>
        <button
          type="button"
          onClick={() => cargarLibros && cargarLibros(categoriaActiva, "500")}
          disabled={cargando}
          className="boton-simular"
        >
          Simular error 500
        </button>
      </div>

      {/* Indicador visual accesible de carga con animación de spinner */}
      {cargando && (
        <div className="alerta-info" role="status">
          <span className="spinner" aria-hidden="true"></span>
          <p>Cargando libros del catálogo, por favor espera...</p>
        </div>
      )}

      {/* Mensaje de error con solución alternativa (botón de reintento) */}
      {error && (
        <div className="error" role="alert">
          <p>
            <strong>Aviso:</strong> {error}
          </p>
          <button
            type="button"
            onClick={() => cargarLibros && cargarLibros(categoriaActiva)}
            disabled={cargando}
            className="boton-reintentar"
          >
            Reintentar conexión
          </button>
        </div>
      )}

      {/* Solución alternativa: si ocurrió un error pero ya existían datos en memoria */}
      {!cargando && error && libros.length > 0 && (
        <p className="mensaje-aviso">
          Mostrando los últimos datos cargados en memoria mientras se restablece
          la comunicación.
        </p>
      )}

      {/* Mensaje cuando la categoría no tiene libros disponibles en el servidor */}
      {!cargando && !error && libros.length === 0 && (
        <p className="mensaje-vacio">
          No se encontraron libros disponibles en la categoría seleccionada.
        </p>
      )}

      {/* Mensaje cuando la búsqueda no coincide con ningún libro */}
      {!cargando && !error && libros.length > 0 && librosFiltrados.length === 0 && (
        <p className="mensaje-vacio">
          No se encontraron libros que coincidan con el término "{busqueda}".
        </p>
      )}

      {/* Contador de resultados */}
      {!cargando && librosFiltrados.length > 0 && (
        <p className="contador-resultados">
          Mostrando {librosFiltrados.length} {librosFiltrados.length === 1 ? "libro" : "libros"}:
        </p>
      )}

      {/* Listado de tarjetas modularizadas cuando los libros están disponibles */}
      {!cargando && librosFiltrados.length > 0 && (
        <div className="tarjetas-libros">
          {librosFiltrados.map((libro) => (
            <TarjetaLibro key={libro.id} libro={libro} />
          ))}
        </div>
      )}
    </section>
  );
}
