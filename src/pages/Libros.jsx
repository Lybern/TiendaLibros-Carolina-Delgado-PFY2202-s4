// Componente para visualizar el catálogo de libros y filtrar por categorías
export default function Libros({
  libros = [],
  cargando = false,
  categoriaActiva = "Todas",
  cambiarCategoria,
}) {
  const categorias = [
    "Todas",
    "Ficción",
    "Ciencia Ficción",
    "Misterio",
    "Fantasía",
    "Drama",
  ];

  return (
    <section>
      <h1>Catálogo de Libros</h1>
      <p>Selecciona una categoría para explorar los libros disponibles:</p>

      {/* Botones para alternar entre categorías (se deshabilitan mientras se realiza una petición) */}
      <div className="acciones">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => cambiarCategoria && cambiarCategoria(cat)}
            disabled={cargando}
            className={categoriaActiva === cat ? "boton-activo" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Indicador visual accesible de carga */}
      {cargando && (
        <div className="alerta-info" role="status">
          <p>Cargando libros del catálogo, por favor espera...</p>
        </div>
      )}

      {/* Mensaje cuando la categoría no tiene libros disponibles */}
      {!cargando && libros.length === 0 && (
        <p className="mensaje-vacio">
          No se encontraron libros disponibles en la categoría seleccionada.
        </p>
      )}

      {/* Listado de tarjetas cuando los libros están listos */}
      {!cargando && libros.length > 0 && (
        <div className="tarjetas-libros">
          {libros.map((libro) => (
            <article className="tarjeta" key={libro.id}>
              <h2>{libro.title}</h2>
              <p>
                <strong>Autor:</strong> {libro.author}
              </p>
              <p>{libro.description}</p>
              <p className="precio">
                ${libro.price?.toLocaleString("es-CL")}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
