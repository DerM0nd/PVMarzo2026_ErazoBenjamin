import { Routes, Route, Link } from "react-router-dom";
import LayoutNav from "./LayoutNav";
import RegisterPasajero from "./RegistrarPasajero";
import RegisterAdmin from "./RegistrarAdmin";
import Login from "./Login";
import CuentaUsuario from "./CuentaUsuario";
import ModificardoUsuario from "./ModificarUsuario";
import CargarHabitacion from "./CargarHabitacion";
import ListaHabitacion from "./ListaHabitacion";
import Confirmar from "./Confirmar";
import Reservar from "./Reservar";
import MiReserva from "./MiReserva";
import './css/index.css'

function Home() {

  return (
    <>
      <div className="main">
        <div className="divMain-container">
          <div className="main-containerText fila">
            <h1 className="main-AppTitle">Hoteleria</h1>
          </div>
          <div className="main-buttonContainer">
            <div className="divContainer-button fila">
              <Link to="/registrarAdmin">
                <button className="btn">Administrador</button>
              </Link>
            </div>
            <div className="divContainer-button fila">
              <Link to="/registrarPasajero">
                <button className="btn">Pasajero</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutNav />}>
        <Route index element={<Home />} />
        <Route path="/#" element={<Home />} />
        <Route path="/registrarPasajero" element={<RegisterPasajero />} />
        <Route path="/registrarAdmin" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cuentaUsuario" element={<CuentaUsuario />} />
        <Route path="/modificarUsuario" element={<ModificardoUsuario />} />
        <Route path="/cargarHabitacion" element={<CargarHabitacion />} />
        <Route path="/listaHabitacion" element={<ListaHabitacion />} />
        <Route path="/confirmacion/:accion" element={<Confirmar />} />
        <Route path="/reservar/:codigo" element={<Reservar/>} />
        <Route path="/miReserva" element={<MiReserva />} />
      </Route>
    </Routes>
  );
}

export default App
