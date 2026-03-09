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
            <div className="login-container">
                <h2>Registrar Habitación</h2>
                <form className="form-charge" onSubmit={cargarHabitacion}>
                    <div>
                        <label htmlFor="fdescripcion">Descripción</label>
                        <input
                            type="text"
                            id="fdescripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fservicios">Servicios incluidos</label>
                        <input
                            type="text"
                            id="fservicios"
                            value={servicios}
                            onChange={(e) => setServicios(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="ftipoHabitacion">Tipo de Habitación</label>
                        <select id="ftipoHabitacion" name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="simple">Simple</option>
                            <option value="doble">Doble</option>
                            <option value="triple">Triple</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                    <div>
                        <p>
                            Costo: <strong>{costo}</strong>
                        </p>
                    </div>
                    <button className="form-btnSubmit" type="submit">Registrar Habitación</button>
                </form>
            </div>
        </>
    )

}


export default CargarHabitacion;