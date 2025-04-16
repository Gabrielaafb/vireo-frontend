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
  {
    id: 1003,
    title: "Infusión Relajante de Hierbas",
    description: "Calma el estrés y promueve el equilibrio emocional.",
    price: 4500,
    image: "https://www.blendsandtea.cl/cdn/shop/files/rec-azul_026ab8d5-1076-4f74-9958-f6aaa70a4340_2048x.jpg?v=1724432723",
    categoria: "Suplementos",
  },
  {
    id: 1004,
    title: "Detergente Newen orgánico 1 Litro",
    description: "Limpieza amigable con el planeta y con tu salud.",
    price: 6000,
    image: "https://newen.mx/wp-content/uploads/2020/04/newen-detergente-sustentable-para-ropa-1-litro-00-01.png",
    categoria: "Cosmética",
  }
];

const mapCategoryIdToNombre = {
  1: "Cosmética Natural",
  2: "Suplementos",
  3: "Aromaterapia",
  4: "Alimentos",
};

const categoriasDisponibles = ["Todas", "Cosmética", "Suplementos", "Aromaterapia", "Alimentos"];

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cantidades, setCantidades] = useState({});
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
      const cantidadesIniciales = {};
      combinadas.forEach((p) => (cantidadesIniciales[p.id] = 1));
      setCantidades(cantidadesIniciales);
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

  const cambiarCantidad = (id, delta) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

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
                <Card className="h-100 shadow-sm d-flex flex-column">
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
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <Button variant="outline-secondary" size="sm" onClick={() => cambiarCantidad(pub.id, -1)}>−</Button>
                      <span className="mx-2">{cantidades[pub.id]}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => cambiarCantidad(pub.id, 1)}>+</Button>
                    </div>
                    <div className="d-grid gap-2">
                      <Link to={`/detalle/${pub.id}`} className="btn btn-outline-success btn-sm">
                        Ver Detalles
                      </Link>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => agregarAlCarrito({ ...pub, cantidad: cantidades[pub.id] })}
                      >
                        🛒 Agregar al carrito
                      </Button>
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

      <footer className="bg-success text-white text-center py-3 mt-5 w-100">
        <Container>
          <p>© {new Date().getFullYear()} Vireo - Marketplace de productos naturales 🌿</p>
        </Container>
      </footer>
    </>
  );
};

export default Publicaciones;



