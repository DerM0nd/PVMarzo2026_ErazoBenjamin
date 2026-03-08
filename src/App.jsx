import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import LayoutNav from "./LayoutNav";
import RegisterPasajero from "./RegistrarPasajero";
import RegisterAdmin from "./RegistrarAdmin";
import Login from "./Login";
import CuentaUsuario from "./CuentaUsuario";
import './css/index.css'

function Home() {

  return (
    <>
      <div class="main">
        <div class="divMain-container">
          <div class="main-containerText fila">
            <h1 class="main-AppTitle">Hoteleria</h1>
          </div>
          <div class="main-buttonContainer">
            <div class="divContainer-button fila">
              <Link to="/registrarAdmin">
                <button className="button-conductor">Administrador</button>
              </Link>
              {/* <a href="#"><button class="button-conductor">Administrador</button></a> */}
            </div>
            <div class="divContainer-button fila">
              <Link to="/registrarPasajero">
                <button className="button-pasajero">Pasajero</button>
              </Link>
              {/* <a href="#"><button class="button-pasajero">Pasajero</button></a> */}
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
      </Route>
    </Routes>
  );
}

export default App
