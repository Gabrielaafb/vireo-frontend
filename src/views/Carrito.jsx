import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Container, ListGroup, Button } from "react-bootstrap";

const Carrito = () => {
  const { carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito } = useContext(CarritoContext);

  return (
    <Container className="mt-4">
      <h2 className="text-center">🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <ListGroup>
          {carrito.map((producto) => (
            <ListGroup.Item key={producto.id} className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={producto.imagen} alt={producto.nombre} width="50" className="me-3" />
                <div>
                  <h5>{producto.nombre}</h5>
                  <p>${producto.precio} - Cantidad: {producto.cantidad}</p>
                </div>
              </div>
              <div>
                <Button variant="success" onClick={() => agregarAlCarrito(producto)}>+</Button>
                <Button variant="warning" className="ms-2" onClick={() => restarDelCarrito(producto.id)}>-</Button>
                <Button variant="danger" className="ms-2" onClick={() => eliminarDelCarrito(producto.id)}>❌</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Carrito;




