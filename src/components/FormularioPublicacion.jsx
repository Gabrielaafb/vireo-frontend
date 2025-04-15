import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const categorias = ["Cosmética", "Suplementos", "Alimentos", "Aromaterapia"];

function FormularioPublicacion() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descripcion || !precio || !imagen) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(precio) || parseFloat(precio) <= 0) {
      setError("El precio debe ser un número válido y mayor que 0.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", titulo);
      formData.append("description", descripcion);
      formData.append("price", precio);
      formData.append("category", categoria);
      formData.append("image", imagen);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/publications`, formData);

      alert("¡Producto publicado con éxito! 🎉");

      // Reiniciar formulario
      setTitulo("");
      setDescripcion("");
      setPrecio("");
      setCategoria(categorias[0]);
      setImagen(null);
      setError("");
    } catch (err) {
      console.error("Error al publicar:", err);
      setError("Hubo un error al intentar publicar el producto.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">📝 Publicar un Producto</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Jabón Artesanal de Coco"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe una descripción detallada"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio (CLP)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 6000"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen del Producto</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImagenChange} />
          {imagen && (
            <img
              src={URL.createObjectURL(imagen)}
              alt="Vista previa"
              className="mt-3 img-fluid"
              style={{ maxWidth: "300px" }}
            />
          )}
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Publicar
        </Button>
      </Form>
    </Container>
  );
}

export default FormularioPublicacion;

