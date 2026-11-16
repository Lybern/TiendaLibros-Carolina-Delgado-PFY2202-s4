import { Link } from "react-router";

// Vista que se despliega cuando la dirección solicitada no existe
export default function PaginaNoEncontrada() {
  return (
    <section>
      <h1>404 - Página no encontrada</h1>
      <p>La dirección que buscas no existe en nuestra tienda.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}
