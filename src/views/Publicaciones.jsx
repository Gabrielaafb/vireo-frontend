import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const productosEjemplo = [
  {
    id: 1001,
    title: "Aceite Esencial de Lavanda",
    description: "Relajante natural para mejorar el descanso.",
    price: 5000,
    image: "https://aldeanativa.cl/cdn/shop/files/aceite-esencial-lavanda-aoc-5-ml-naturel-623191-435632.jpg?v=1718727324",
    categoria: "Aromaterapia",
  },
  {
    id: 1002,
    title: "Shampoo Natural de Coco en barra",
    description: "Fortalece el cabello e hidrata profundamente.",
    price: 8000,
    image: "https://organicplace.cl/wp-content/uploads/2024/03/SSC_A-scaled.webp",
    categoria: "Cosmética",
  },
];

const mapCategoryIdToNombre = {
  1: "Cosmética",
  2: "Suplementos",
  3: "Aromaterapia",
  4: "Alimentos",
};

const categoriasDisponibles = ["Todas", "Cosmética", "Suplementos", "Aromaterapia", "Alimentos"];

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [ordenPrecio, setOrdenPrecio] = useState("default");
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CarritoContext);

  const fetchPublicaciones = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publications`);
      const data = await res.json();
      const backendPublicaciones = data.map((pub) => ({
        ...pub,
        categoria: mapCategoryIdToNombre[pub.category_id] || "Otros",
      }));
      const combinadas = [...backendPublicaciones, ...productosEjemplo];
      setPublicaciones(combinadas);
    } catch (error) {
      console.error("🛑 Error al cargar publicaciones:", error);
      setPublicaciones(productosEjemplo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const eliminarPublicacion = async (id) => {
    try {
      const confirm = window.confirm("¿Estás segura de que quieres borrar esta publicación?");
      if (!confirm) return;

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publications/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPublicaciones(publicaciones.filter((p) => p.id !== id));
        alert("✅ Publicación eliminada");
      } else {
        alert("❌ No se pudo eliminar");
      }
    } catch (error) {
      console.error("🛑 Error al eliminar publicación:", error);
    }
  };

  const publicacionesFiltradas = publicaciones
    .filter((p) => filtroCategoria === "Todas" || p.categoria === filtroCategoria)
    .sort((a, b) => {
      if (ordenPrecio === "menor") return a.price - b.price;
      if (ordenPrecio === "mayor") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Container className="mt-4">
        <h2>🌿 Publicaciones Disponibles</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label><strong>Filtrar por categoría:</strong></Form.Label>
              <Form.Select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                {categoriasDisponibles.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label><strong>Ordenar por precio:</strong></Form.Label>
              <Form.Select value={ordenPrecio} onChange={(e) => setOrdenPrecio(e.target.value)}>
                <option value="default">Sin ordenar</option>
                <option value="menor">Menor a mayor</option>
                <option value="mayor">Mayor a menor</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            {publicacionesFiltradas.map((pub) => (
              <Col key={pub.id} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={pub.image}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{pub.title}</Card.Title>
                      <Card.Text>Precio: ${pub.price}</Card.Text>
                    </div>
                    <div className="mt-2 d-grid gap-2">
                      <Link to={`/detalle/${pub.id}`} className="btn btn-outline-success btn-sm">
                        Ver Detalles
                      </Link>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => agregarAlCarrito({ ...pub, cantidad: 1 })}
                      >
                        🛒 Agregar al carrito
                      </Button>
                      {/* Solo borrar si es publicación real del backend */}
                      {pub.id < 1000 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => eliminarPublicacion(pub.id)}
                        >
                          🗑️ Eliminar
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <footer className="bg-success text-white text-center py-3 mt-5">
        <Container>
          <p>© {new Date().getFullYear()} Vireo - Marketplace de productos naturales 🌿</p>
        </Container>
      </footer>
    </>
  );
};

export default Publicaciones;


