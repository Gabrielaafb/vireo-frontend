import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Container, ListGroup, Button, Alert } from "react-bootstrap";

const Carrito = () => {
  const { carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito } = useContext(CarritoContext);
  const [compraRealizada, setCompraRealizada] = useState(false);

  const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

  const confirmarCompra = () => {
    setCompraRealizada(true);
    setTimeout(() => {
      // vacía el carrito simulado
      window.location.reload(); // reinicia la vista simulando proceso final
    }, 2000);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">🛒 Carrito de Compras</h2>

      {compraRealizada && <Alert variant="success">¡Compra realizada con éxito! 🧾 Gracias por confiar en Vireo 🌿</Alert>}

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <>
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

          <div className="text-end mt-4">
            <h4>Total a pagar: <strong>${total}</strong></h4>
            <Button variant="success" onClick={confirmarCompra} className="mt-2">Confirmar Compra</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Carrito;





