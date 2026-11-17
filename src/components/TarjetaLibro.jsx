// Componente modular y reutilizable para representar individualmente cada libro
export default function TarjetaLibro({ libro }) {
  if (!libro) {
    return null;
  }

  return (
    <article className="tarjeta">
      {/* Insignia de categoría destacada */}
      {libro.genre && (
        <span className="insignia-categoria">{libro.genre}</span>
      )}
      <h2>{libro.title}</h2>
      <p className="autor">
        <strong>Autor:</strong> {libro.author}
      </p>
      <p className="descripcion">{libro.description}</p>
      <div className="tarjeta-pie">
        <span className="precio">${libro.price?.toLocaleString("es-CL")}</span>
      </div>
    </article>
  );
}
