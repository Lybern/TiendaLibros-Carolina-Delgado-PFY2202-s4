import { CATEGORIAS_DISPONIBLES } from "../constants/categorias.js";
import TarjetaLibro from "../components/TarjetaLibro.jsx";

// Componente de página para visualizar el catálogo y filtrar por categorías
export default function Libros({
  libros = [],
  cargando = false,
  error = "",
  categoriaActiva = "Todas",
  cargarLibros,
}) {
  // Centralizamos las categorías combinando la opción general "Todas" con las constantes compartidas
  const categorias = ["Todas", ...CATEGORIAS_DISPONIBLES];

  return (
    <section>
      <h1>Catálogo de Libros</h1>
      <p>Selecciona una categoría para explorar los libros disponibles:</p>

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

      {/* Indicador visual accesible de carga */}
      {cargando && (
        <div className="alerta-info" role="status">
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

      {/* Mensaje cuando la categoría no tiene libros disponibles */}
      {!cargando && !error && libros.length === 0 && (
        <p className="mensaje-vacio">
          No se encontraron libros disponibles en la categoría seleccionada.
        </p>
      )}

      {/* Listado de tarjetas modularizadas cuando los libros están disponibles */}
      {!cargando && libros.length > 0 && (
        <div className="tarjetas-libros">
          {libros.map((libro) => (
            <TarjetaLibro key={libro.id} libro={libro} />
          ))}
        </div>
      )}
    </section>
  );
}
