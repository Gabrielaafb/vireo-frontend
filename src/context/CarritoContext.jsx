import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = useCallback((producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((p) => p.id === producto.id);

      if (productoExistente) {
        return prevCarrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  }, []);


 
  const restarDelCarrito = useCallback((id) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: Math.max(0, producto.cantidad - 1) }
            : producto
        )
        .filter((producto) => producto.cantidad > 0)
    );
  }, []);

  
  const eliminarDelCarrito = useCallback((id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
  }, []);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
