import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  const { iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
        name: form.nombre,
        email: form.email,
        password: form.password,
        image: "https://via.placeholder.com/150",
      });

      iniciarSesion(res.data.user);
      navigate("/profile");
    } catch  {
      setError("Error al registrar. ¿Ya existe ese correo?");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">📝 Registro de Usuario</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </Form.Group>

        <Button variant="success" type="submit" className="mt-4 w-100">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default Register;

