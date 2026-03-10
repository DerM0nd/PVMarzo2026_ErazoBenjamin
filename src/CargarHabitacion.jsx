import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAdmin } from "./hooks/useUser";
import './css/cargarHabitacion.css'

function CargarHabitacion() {
    const [tipo, setTipo] = useState('simple');
    const [servicios, setServicios] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate();

    useUser(); // ASEGURA QUE EL USUARIO ESTÁ AUTENTICADO ANTES DE ENTRAR A LA PAGINA
    useAdmin(); // ASEGURA QUE EL USUARIO SEA ADMINISTRADOR ANTES DE ENTRAR A LA PAGINA

    const cargarHabitacion = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/habitaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tipo: tipo,
                    servicios: servicios,
                    descripcion: descripcion,
                    costo: costo,
                    estado: "disponible"
                })
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                console.error("Failed to load habitacion:", data);
                return window.alert("Error al cargar la habitación. Por favor, inténtalo de nuevo.");
            }

            alert("Habitación cargada exitosamente");
            setTipo('');
            setServicios('');
            setDescripcion('');
            setCosto('');

        } catch (err) {
            console.error("Network or unexpected error:", err);
        }
    }

    const precios = {
        simple: 10000,
        doble: 18000,
        triple: 24000,
        premium: 40000
    };

    const costo = precios[tipo];

    return (
        <>
            <div className="hab-title-container">
                <h2 className="hab-title">Cargar Nueva Habitación</h2>
            </div>
            <div className="hab-login-container">  
                <form className="hab-form-charge" onSubmit={cargarHabitacion}>
                    <div className="hab-formDiv">
                        <label htmlFor="hab-fdescripcion-label">Descripción</label>
                        <input
                            type="text"
                            id="hab-formDescripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required/>
                    </div>
                    <div className="hab-formDiv">
                        <label htmlFor="hab-fServicios-label">Servicios incluidos</label>
                        <input
                            type="text"
                            id="hab-formServicios"
                            value={servicios}
                            onChange={(e) => setServicios(e.target.value)}
                            required
                            placeholder="Desayuno, limpieza..."
                        />
                    </div>
                    <div className="hab-formDiv">
                        <label htmlFor="hab-fTipoHabitacion-label">Tipo de Habitación</label>
                        <select id="hab-fTipoHabitacion-select" name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="simple">Simple</option>
                            <option value="doble">Doble</option>
                            <option value="triple">Triple</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                    <div className="hab-formDiv hab-costos">
                        <p className="hab-formP">
                            Costo: <strong>{costo}</strong> Por día
                        </p>
                    </div>
                    <div className="hab-formDiv hab-btnContainer">
                        <button className="btn" type="submit">Registrar Habitación</button>
                    </div>
                </form>
            </div>
        </>
    )

}


export default CargarHabitacion;