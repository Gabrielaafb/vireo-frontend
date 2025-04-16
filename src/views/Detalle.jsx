import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";

const Detalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducto = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publications/${id}`);
      const data = await res.json();
      setProducto(data);
    } catch (error) {
      console.error("🛑 Error al obtener detalle:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!producto) {
    return <h2 className="text-center mt-5">Producto no encontrado</h2>;
  }

  return (
    <Container className="mt-4">
      <Card className="text-center">
        <Card.Img variant="top" src={producto.image} alt={producto.title} />
        <Card.Body>
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text>{producto.description}</Card.Text>
          <Card.Text>Precio: ${producto.price}</Card.Text>

          <div className="d-grid gap-2">
            <Button variant="success" onClick={() => agregarAlCarrito(producto)}>
              🛒 Agregar al Carrito
            </Button>

            <Button
              variant="outline-primary"
              href={`mailto:vendedor@vireo.cl?subject=Consulta sobre ${producto.title}`}
            >
              ✉️ Contactar al Vendedor
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Detalle;

