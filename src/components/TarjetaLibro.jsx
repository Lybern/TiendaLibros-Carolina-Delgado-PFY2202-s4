// Componente modular y reutilizable para representar individualmente cada libro
export default function TarjetaLibro({ libro }) {
  if (!libro) {
    return null;
  }

  return (
    <article className="tarjeta">
      <h2>{libro.title}</h2>
      <p>
        <strong>Autor:</strong> {libro.author}
      </p>
      <p>{libro.description}</p>
      <p className="precio">
        ${libro.price?.toLocaleString("es-CL")}
      </p>
    </article>
  );
}
