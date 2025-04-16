import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Container, ListGroup, Button, Alert, Image } from "react-bootstrap";

const Carrito = () => {
  const { carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito } = useContext(CarritoContext);
  const [compraRealizada, setCompraRealizada] = useState(false);

  const total = carrito.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);

  const confirmarCompra = () => {
    setCompraRealizada(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>

      {compraRealizada && (
        <Alert variant="success">¡Compra realizada con éxito! 🧾 Gracias por confiar en Vireo 🌿</Alert>
      )}

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <>
          <ListGroup>
            {carrito.map((producto) => (
              <ListGroup.Item key={producto.id} className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <Image src={producto.image} alt={producto.title} width="60" height="60" style={{ objectFit: "cover" }} rounded />
                  <div>
                    <h6 className="mb-1">{producto.title}</h6>
                    <small>${producto.price} x {producto.cantidad} = <strong>${producto.price * producto.cantidad}</strong></small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="success" size="sm" onClick={() => agregarAlCarrito(producto)}>+</Button>
                  <Button variant="warning" size="sm" onClick={() => restarDelCarrito(producto.id)}>-</Button>
                  <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(producto.id)}>❌</Button>
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
