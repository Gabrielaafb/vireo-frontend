import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 

function CardProducto({ id, titulo, imagen, precio }) {
  return (
    <div className="card">
      <img src={imagen} alt={titulo} />
      <h3>{titulo}</h3>
      <p>Precio: ${precio}</p>
      <Link to={`/publicacion/${id}`} className="btn">
        Ver Detalles
      </Link>
    </div>
  );
}

CardProducto.propTypes = {
  id: PropTypes.number.isRequired,
  titulo: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired, 
};

export default CardProducto;

