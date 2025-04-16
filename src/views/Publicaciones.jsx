import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CardProducto from "../components/CardProducto";

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/publications`);
        setPublicaciones(res.data);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPublicaciones();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🌿 Publicaciones Disponibles</h2>

      {cargando ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
          <p>Cargando productos...</p>
        </div>
      ) : publicaciones.length === 0 ? (
        <p className="text-center">No hay publicaciones disponibles por ahora.</p>
      ) : (
        <Row>
          {publicaciones.map((p) => (
            <Col key={p.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <CardProducto
                id={p.id}
                titulo={p.title}
                imagen={p.image}
                precio={p.price}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Publicaciones;
