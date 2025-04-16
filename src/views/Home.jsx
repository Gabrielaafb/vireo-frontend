import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/home.css"; 

const productosEjemplo = [
  {
    id: 1,
    nombre: "Aceite Esencial de Lavanda",
    imagen: "https://aldeanativa.cl/cdn/shop/files/aceite-esencial-lavanda-aoc-5-ml-naturel-623191-435632.jpg?v=1718727324",
    descripcion: "Relajante natural para mejorar el descanso.",
  },
  {
    id: 2,
    nombre: "Shampoo Natural de Coco en barra",
    imagen: "https://organicplace.cl/wp-content/uploads/2024/03/SSC_A-scaled.webp",
    descripcion: "Fortalece el cabello e hidrata profundamente.",
  },
  {
    id: 3,
    nombre: "Infusión Relajante de Hierbas",
    imagen: "https://www.blendsandtea.cl/cdn/shop/files/rec-azul_026ab8d5-1076-4f74-9958-f6aaa70a4340_2048x.jpg?v=1724432723",
    descripcion: "Mezcla especial para calmar el estrés y promover el equilibrio emocional.",
  },
  {
    id: 4,
    nombre: "Detergente Newen orgánico 1 Litro",
    imagen: "https://newen.mx/wp-content/uploads/2020/04/newen-detergente-sustentable-para-ropa-1-litro-00-01.png",
    descripcion: "Limpieza amigable con el planeta y con tu salud.",
  },
];


const categorias = ["Cosmética", "Suplementos", "Alimentos", "Aromaterapia"];

function Home() {
  return (
    <Container className="mt-4">
    
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="text-center shadow">
            <Card.Img
              variant="top"
              src="/src/assets/banner.jpg" 
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
            <Card className="shadow-sm">
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Link to={`/detalle/${producto.id}`}> 
                  <Button variant="success">Ver más</Button>
                </Link>
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


