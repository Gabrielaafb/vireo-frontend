import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Card } from "react-bootstrap";

const Profile = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const [nombre, setNombre] = useState(usuario ? usuario.nombre : "");
  const [email, setEmail] = useState(usuario ? usuario.email : "");
  const [foto, setFoto] = useState(usuario ? usuario.foto : "https://via.placeholder.com/150");

  const handleGuardar = (e) => {
    e.preventDefault();
    alert("Perfil actualizado con éxito ✅");
  };

  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFoto(e.target.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  return (
    <Container className="mt-4 profile-container">
      <h2 className="text-center">Mi Perfil</h2>
      <Card className="p-4 text-center profile-card">
        <img src={foto} alt="Foto de perfil" className="perfil-foto" />
        <Form onSubmit={handleGuardar}>
          <Form.Group className="mb-3">
            <Form.Label>Subir Foto de Perfil</Form.Label>
            <Form.Control type="file" onChange={handleFotoChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="success">Guardar Cambios</Button>
          <Button variant="danger" className="ms-2" onClick={cerrarSesion}>Cerrar Sesión</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;


