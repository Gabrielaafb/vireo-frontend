import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const productosEjemplo = [
  {
    id: 1001,
    title: "Aceite Esencial de Lavanda",
    description: "Relajante natural para mejorar el descanso.",
    price: 5000,
    image: "https://aldeanativa.cl/cdn/shop/files/aceite-esencial-lavanda-aoc-5-ml-naturel-623191-435632.jpg?v=1718727324",
    category_id: 3,
  },
  {
    id: 1002,
    title: "Shampoo Natural de Coco en barra",
    description: "Fortalece el cabello e hidrata profundamente.",
    price: 8000,
    image: "https://organicplace.cl/wp-content/uploads/2024/03/SSC_A-scaled.webp",
    category_id: 1,
  },
  {
    id: 1003,
    title: "Infusión Relajante de Hierbas",
    description: "Mezcla especial para calmar el estrés y promover el equilibrio emocional.",
    price: 4500,
    image: "https://www.blendsandtea.cl/cdn/shop/files/rec-azul_026ab8d5-1076-4f74-9958-f6aaa70a4340_2048x.jpg?v=1724432723",
    category_id: 4,
  },
];

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CarritoContext);

  const fetchPublicaciones = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publications`);
      const data = await res.json();
      const combinadas = [...data, ...productosEjemplo];
      setPublicaciones(combinadas);
    } catch (error) {
      console.error("🛑 Error al cargar publicaciones:", error);
      setPublicaciones(productosEjemplo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  return (
    <Container className="mt-4">
      <h2>🌿 Publicaciones Disponibles</h2>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Row>
          {publicaciones.map((pub) => (
            <Col key={pub.id} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={pub.image}
                  alt={pub.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{pub.title}</Card.Title>
                  <Card.Text>Precio: ${pub.price}</Card.Text>
                  <div className="mt-auto d-grid gap-2">
                    <Link to={`/detalle/${pub.id}`} className="btn btn-outline-success">
                      Ver Detalles
                    </Link>
                    <Button variant="success" onClick={() => agregarAlCarrito(pub)}>
                      🛒 Agregar al carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Publicaciones;
