import { Link } from "react-router";

// Vista de bienvenida principal para la tienda de libros
export default function Inicio() {
  return (
    <div className="inicio-contenedor">
      {/* Sección Hero principal */}
      <section className="hero-banner">
        <span className="hero-etiqueta">Tu librería online</span>
        <h1>Descubre mundos increíbles a través de las letras</h1>
        <p>
          Explora nuestro catálogo literario organizado por géneros. Encuentra
          tu próxima gran historia y disfruta de una experiencia de compra sencilla y rápida.
        </p>
        <div className="hero-acciones">
          <Link to="/libros" className="boton-hero">
            Explorar catálogo de libros &rarr;
          </Link>
        </div>
      </section>

      {/* Beneficios y servicios de la librería */}
      <section className="caracteristicas-grid">
        <div className="caracteristica-tarjeta">
          <span className="icono-caracteristica">🚚</span>
          <h3>Envíos a Todo el País</h3>
          <p>
            Recibe tus títulos favoritos directamente en tu puerta con entrega rápida y segura.
          </p>
        </div>

        <div className="caracteristica-tarjeta">
          <span className="icono-caracteristica">📖</span>
          <h3>Selección Exclusiva</h3>
          <p>
            Obras cuidadosamente elegidas en ficción, ciencia ficción, misterio y fantasía.
          </p>
        </div>

        <div className="caracteristica-tarjeta">
          <span className="icono-caracteristica">💳</span>
          <h3>Compra Protegida</h3>
          <p>
            Variedad de métodos de pago y soporte dedicado para cada una de tus compras.
          </p>
        </div>
      </section>
    </div>
  );
}
