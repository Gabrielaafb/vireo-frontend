import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import Detalle from "./views/Detalle";
import Publicaciones from "./views/Publicaciones";
import FormularioPublicacion from "./components/FormularioPublicacion"; 
import Carrito from "./views/Carrito"

function App() {
  return (
    <>
      <Navigation />
      <main className="container mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/publicaciones" element={<Publicaciones />} />
          <Route path="/publicar" element={<FormularioPublicacion />} /> 
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
