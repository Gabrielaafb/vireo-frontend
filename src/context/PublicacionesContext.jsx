import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const PublicacionesContext = createContext();

export function PublicacionesProvider({ children }) {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    
    const fetchPublicaciones = async () => {
      const data = [
        {
          id: 1,
          titulo: "Aceite Esencial de Lavanda",
          imagen: "https://aldeanativa.cl/cdn/shop/files/aceite-esencial-lavanda-aoc-5-ml-naturel-623191-435632.jpg?v=1718727324",
          precio: 15000,
          categoria: "Aromaterapia",
          vendedor: "Tienda Natural",
        },
        {
          id: 2,
          titulo: "Shampoo de Romero",
          imagen: "https://source.unsplash.com/300x300/?shampoo,herbal",
          precio: 8000,
          categoria: "Cosmética",
          vendedor: "Eco Belleza",
        },
      ];
      setPublicaciones(data);
    };

    fetchPublicaciones();
  }, []);

  return (
    <PublicacionesContext.Provider value={{ publicaciones, setPublicaciones }}>
      {children}
    </PublicacionesContext.Provider>
  );
}

PublicacionesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
