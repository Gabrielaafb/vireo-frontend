import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";

const Detalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducto = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publications`);
      const data = await res.json();
      const encontrado = data.find((p) => p.id === parseInt(id));
      setProducto(encontrado);
    } catch (error) {
      console.error("🛑 Error al cargar detalle:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (!producto) return <h2 className="text-center">Producto no encontrado</h2>;

  return (
    <Container className="mt-4">
      <Card className="text-center shadow" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Card.Img
          variant="top"
          src={producto.image}
          alt={producto.title}
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="fw-bold">{producto.title}</Card.Title>
          <Card.Text className="text-muted mb-2">{producto.description}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${producto.price}</Card.Text>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <Button
              variant="success"
              size="sm"
              onClick={() => agregarAlCarrito(producto)}
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
    </Container>
  );
};

export default Detalle;

