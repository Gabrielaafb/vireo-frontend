import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";

// Productos de ejemplo por si no existe en backend
const productosEjemplo = [
  {
    id: 1001,
    title: "Aceite Esencial de Lavanda",
    description: "Relajante natural para mejorar el descanso.",
    price: 5000,
    image: "https://aldeanativa.cl/cdn/shop/files/aceite-esencial-lavanda-aoc-5-ml-naturel-623191-435632.jpg?v=1718727324",
  },
  {
    id: 1002,
    title: "Shampoo Natural de Coco en barra",
    description: "Fortalece el cabello e hidrata profundamente.",
    price: 8000,
    image: "https://organicplace.cl/wp-content/uploads/2024/03/SSC_A-scaled.webp",
  },
  {
    id: 1003,
    title: "Infusión Relajante de Hierbas",
    description: "Calma el estrés y promueve el equilibrio emocional.",
    price: 4500,
    image: "https://www.blendsandtea.cl/cdn/shop/files/rec-azul_026ab8d5-1076-4f74-9958-f6aaa70a4340_2048x.jpg?v=1724432723",
  },
  {
    id: 1004,
    title: "Detergente Newen orgánico 1 Litro",
    description: "Limpieza amigable con el planeta y con tu salud.",
    price: 6000,
    image: "https://newen.mx/wp-content/uploads/2020/04/newen-detergente-sustentable-para-ropa-1-litro-00-01.png",
  }
];

const Detalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publications`);
        const data = await res.json();

        const allProducts = [...data, ...productosEjemplo];
        const encontrado = allProducts.find((p) => p.id === parseInt(id));
        setProducto(encontrado);
      } catch (error) {
        console.error("🛑 Error al cargar detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const aumentarCantidad = () => setCantidad((prev) => prev + 1);
  const disminuirCantidad = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAgregar = () => {
    agregarAlCarrito({ ...producto, cantidad });
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (!producto) return <h2 className="text-center">Producto no encontrado</h2>;

  return (
    <Container className="mt-4">
      <Card className="text-center shadow" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Card.Img
          variant="top"
          src={producto.image}
          alt={producto.title}
          style={{ height: "400px", objectFit: "contain", padding: "10px" }}
        />
        <Card.Body>
          <Card.Title className="fw-bold">{producto.title}</Card.Title>
          <Card.Text className="text-muted mb-2">{producto.description}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${producto.price}</Card.Text>

          <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <Button variant="outline-secondary" size="sm" onClick={disminuirCantidad}>−</Button>
            <span><strong>{cantidad}</strong></span>
            <Button variant="outline-secondary" size="sm" onClick={aumentarCantidad}>＋</Button>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <Button
              variant="success"
              size="sm"
              onClick={handleAgregar}
            >
              🛒 Agregar al Carrito
            </Button>

            <a
              href={`mailto:contacto@vireo.cl?subject=Consulta por ${producto.title}`}
              className="btn btn-outline-primary btn-sm"
            >
              ✉️ Contactar al Vendedor
            </a>
          </div>
        </Card.Body>
      </Card>

      <footer className="bg-success text-white text-center py-3 mt-5 w-100">
        <Container>
          <p className="mb-0">
            © {new Date().getFullYear()} Vireo — Marketplace de productos naturales 🌿
          </p>
        </Container>
      </footer>
    </Container>
  );
};

export default Detalle;


