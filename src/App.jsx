import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import RegisterPasajero from "./RegisterPasajero";

function Home() {

  return (
    <>
      <header class="navHeader">
        <div class="divHeader-container">
          <h1 class="header-container-CurrentPage">Menu de Selección</h1>
        </div>
      </header>
      <div class="main">
        <div class="divMain-container">
          <div class="main-containerText fila">
            <h1 class="main-AppTitle">Hoteleria</h1>
          </div>
          <div class="main-buttonContainer">
            <div class="divContainer-button fila">
              <Link to="/admin">
                <button className="button-conductor">Administrador</button>
              </Link>
              {/* <a href="#"><button class="button-conductor">Administrador</button></a> */}
            </div>
            <div class="divContainer-button fila">
              <Link to="/registerPasajero">
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
      <Route path="/" element={<Home />} />
      <Route path="/#" element={<Home />} />
      <Route path="/registerPasajero" element={<RegisterPasajero />} />
    </Routes>
  );
}

export default App
