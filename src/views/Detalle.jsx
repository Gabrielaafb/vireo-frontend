import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";


const productosEjemplo = [
  { id: 1, nombre: "Aceite Esencial de Lavanda",categoria: "Aromaterapia", precio: 5000, imagen: "https://aldeanativa.cl/cdn/shop/files/aceite-esencial-lavanda-aoc-5-ml-naturel-623191-435632.jpg?v=1718727324" },
  { id: 2, nombre: "Shampoo Natural de Coco en barra", categoria: "Cosmetica" , precio: 8000, imagen: "https://organicplace.cl/wp-content/uploads/2024/03/SSC_A-scaled.webp" },
  { id: 3, nombre: "Infusión Relajante de Hierbas", categoria: "Suplementos", precio: 4500, imagen: "https://www.blendsandtea.cl/cdn/shop/files/rec-azul_026ab8d5-1076-4f74-9958-f6aaa70a4340_2048x.jpg?v=1724432723" },
  { id: 4, nombre: "Detergente Newen orgánico 1 Litro", categoria: "Cosmética", precio: 6000, imagen: "https://newen.mx/wp-content/uploads/2020/04/newen-detergente-sustentable-para-ropa-1-litro-00-01.png" },
  { id: 5, nombre: "Miel Orgánica", categoria: "Alimentos", precio: 7000, imagen: "https://naturel.cl/cdn/shop/files/Miel_Multifloral_kilo_1080x.png?v=1736988845" },
  { id: 6, nombre: "Mascarilla de Arcilla", categoria: "Cosmética", precio: 6500, imagen: "https://dbs.cl/media/catalog/product/b/y/byphasse-bh-09415.jpg?optimize=low&bg-color=255,255,255&fit=bounds&height=&width=" },
  { id: 7, nombre: "Velas de Cera de Abeja", categoria: "Aromaterapia", precio: 5500, imagen: "https://www.albinabosch.com/wp-content/uploads/2019/07/velas-cera-de-abeja-candles-cerabella-albina-bosch-DSC3812.jpg" },
  { id: 8, nombre: "Cacao en Polvo Orgánico", categoria: "Alimentos", precio: 9000, imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now06672/y/60.jpg" },
  { id: 9, nombre: "Aceite de Almendras", categoria: "Cosmética", precio: 7500, imagen: "https://spacionatural.cl/cdn/shop/files/Aceite_de_almendras_natural_100ml.jpg?v=1728660520&width=2048" },
  { id: 10, nombre: "Sales de Baño Relajantes", categoria: "Aromaterapia", precio: 5000, imagen: "https://i0.wp.com/ainhoabio.pe/wp-content/uploads/2021/06/SAL-DE-BANO-LAVANDA-w.jpg?fit=750%2C750&ssl=1" }
];

const Detalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const producto = productosEjemplo.find((p) => p.id === Number(id));

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <Container className="mt-4">
      <Card className="text-center">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>Precio: ${producto.precio}</Card.Text>
          <Button variant="success" onClick={() => agregarAlCarrito(producto)}>
            🛒 Agregar al Carrito
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Detalle;

