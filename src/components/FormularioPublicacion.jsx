import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

const FormularioPublicacion = () => {
  const { usuario } = useContext(AuthContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      setMensaje("Debes iniciar sesión para publicar.");
      return;
    }

    if (!titulo || !descripcion || !precio || !categoria || !imagen) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", titulo);
    formData.append("description", descripcion);
    formData.append("price", precio);
    formData.append("category_id", categoria); 
    formData.append("user_id", usuario.id); 
    formData.append("image", imagen);
    try {
      setCargando(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/publications`, formData);
      setMensaje("✅ Publicación creada exitosamente");
      console.log("Publicación:", res.data);

      // Limpiar el formulario
      setTitulo("");
      setDescripcion("");
      setPrecio("");
      setCategoria("");
      setImagen(null);
    } catch (error) {
      console.error("Error al publicar:", error);
      setMensaje("❌ Error al crear la publicación");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📢 Publicar un producto</h2>

      {mensaje && <Alert variant={mensaje.startsWith("✅") ? "success" : "danger"}>{mensaje}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">Selecciona una categoría</option>
            <option value="1">Suplementos</option>
            <option value="2">Terapias</option>
            <option value="3">Cosmética natural</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} required />
        </Form.Group>

        <Button variant="success" type="submit" className="mt-4" disabled={cargando}>
          {cargando ? <Spinner animation="border" size="sm" /> : "Publicar"}
        </Button>
      </Form>
    </Container>
  );
};

export default FormularioPublicacion;


