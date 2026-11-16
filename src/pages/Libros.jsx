// Componente para visualizar el catálogo de libros y filtrar por categorías
export default function Libros({
  libros = [],
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

      {/* Botones para alternar entre categorías */}
      <div className="acciones">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => cambiarCategoria && cambiarCategoria(cat)}
            className={categoriaActiva === cat ? "boton-activo" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listado de tarjetas de libros */}
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
    </section>
  );
}
