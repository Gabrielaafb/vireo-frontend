import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navigation.css"; 

const Navigation = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);

  return (
    <nav className="navbar">
      
      <Link to="/home" className="logo"> 
        <img src="../assets/logo.png" alt="Vireo" className="logo-img" />
      </Link>

   
      <div className="nav-links">
        {usuario ? (
          <>
            <Link to="/publicar"><FontAwesomeIcon icon={faPlus} /> Publicar</Link>
            <Link to="/carrito"><FontAwesomeIcon icon={faShoppingCart} /> Carrito</Link>
            <Link to="/profile"><FontAwesomeIcon icon={faUser} /> {usuario.nombre}</Link>
            <button onClick={cerrarSesion} className="logout-btn">
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Iniciar Sesión</Link>
            <Link to="/register" className="register-btn">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;




