import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types"; // ✅ Importar PropTypes

const BotonAgregarCarrito = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <Button variant="primary" onClick={() => agregarAlCarrito(producto)}>
      🛒 Agregar al Carrito
    </Button>
  );
};

BotonAgregarCarrito.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
};

export default BotonAgregarCarrito;

