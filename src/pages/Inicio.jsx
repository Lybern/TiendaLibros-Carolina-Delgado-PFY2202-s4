import { Link } from "react-router";

// Vista de bienvenida para la portada principal de la tienda
export default function Inicio() {
  return (
    <section>
      <h1>Bienvenido a la Tienda de Libros</h1>
      <p>
        Explora nuestro catálogo literario organizado por géneros y encuentra tu
        próxima lectura.
      </p>
      <Link to="/libros">Ir al catálogo de libros</Link>
    </section>
  );
}
