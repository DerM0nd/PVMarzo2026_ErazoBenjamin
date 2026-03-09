import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import LayoutNav from "./LayoutNav";
import RegisterPasajero from "./RegistrarPasajero";
import RegisterAdmin from "./RegistrarAdmin";
import Login from "./Login";
import CuentaUsuario from "./CuentaUsuario";
import ModificardoUsuario from "./ModificarUsuario";
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
                <button className="button-conductor">Administrador</button>
              </Link>
            </div>
            <div className="divContainer-button fila">
              <Link to="/registrarPasajero">
                <button className="button-pasajero">Pasajero</button>
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
      </Route>
    </Routes>
  );
}

export default App
