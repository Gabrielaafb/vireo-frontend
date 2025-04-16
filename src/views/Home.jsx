import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/home.css"; 

const productosEjemplo = [
  {
    id: 1001,
    title: "Aceite Esencial de Lavanda",
    image: "https://aldeanativa.cl/cdn/shop/files/aceite-esencial-lavanda-aoc-5-ml-naturel-623191-435632.jpg?v=1718727324",
    description: "Relajante natural para mejorar el descanso.",
    price: 5000,
  },
  {
    id: 1002,
    title: "Shampoo Natural de Coco en barra",
    image: "https://organicplace.cl/wp-content/uploads/2024/03/SSC_A-scaled.webp",
    description: "Fortalece el cabello e hidrata profundamente.",
    price: 8000,
  },
  {
    id: 1003,
    title: "Infusión Relajante de Hierbas",
    image: "https://www.blendsandtea.cl/cdn/shop/files/rec-azul_026ab8d5-1076-4f74-9958-f6aaa70a4340_2048x.jpg?v=1724432723",
    description: "Mezcla especial para calmar el estrés y promover el equilibrio emocional.",
    price: 4500,
  },
  {
    id: 1004,
    title: "Detergente Newen orgánico 1 Litro",
    image: "https://newen.mx/wp-content/uploads/2020/04/newen-detergente-sustentable-para-ropa-1-litro-00-01.png",
    description: "Limpieza amigable con el planeta y con tu salud.",
    price: 6000,
  },
];

function Home() {
  return (
    <Container className="mt-4">
    
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="text-center shadow">
            <Card.Img
              variant="top"
              src="/banner.jpg" // si está en public/
              alt="Bienestar y Naturaleza"
            />
            <Card.Body>
              <Card.Title className="fw-bold">🌿 Bienvenido a Vireo 🌿</Card.Title>
              <Card.Text>Explora una selección de productos naturales para tu bienestar.</Card.Text>
              <Link to="/publicaciones">
                <Button variant="success">Ver Productos</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="text-center my-4">🆕 Publicaciones Recientes</h2>
      <Row>
        {productosEjemplo.map((producto) => (
          <Col md={3} key={producto.id}>
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src={producto.image} alt={producto.title} style={{ height: "180px", objectFit: "cover" }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>{producto.description}</Card.Text>
                <div className="mt-auto">
                  <Link to={`/detalle/${producto.id}`} className="btn btn-outline-success btn-sm">
                    Ver más
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <footer className="bg-success text-white text-center py-3 mt-5">
        <Container>
          <p>© {new Date().getFullYear()} Vireo - Marketplace de productos naturales 🌿</p>
        </Container>
      </footer>
    </Container>
  );
}

export default Home;
