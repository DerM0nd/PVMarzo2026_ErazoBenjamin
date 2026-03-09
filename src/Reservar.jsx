import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useUser, useUsuarioGuardado } from "./hooks/useUser";
import './css/reservar.css'


function Reservar() {
    const [fechaReserva, setFechaReserva] = useState('');
    const [cantidadDias, setCantidadDias] = useState('');
    const [habitacion, setHabitacion] = useState(null);
    const location = useLocation();

    const { codigo } = useParams();
    const usuario = useUsuarioGuardado(); // OBTIENE EL USUARIO
    const navigate = useNavigate();

    const costoTotal = habitacion ? habitacion.costo * (parseInt(cantidadDias) || 0) : 0;

    useUser(); // ASEGURA QUE EL USUARIO ESTÁ AUTENTICADO ANTES DE ENTRAR A LA PAGINA

    useEffect(() => {
        fetch(`http://localhost:3001/habitaciones`)
            .then(res => res.json())
            .then(data => {
                const hab = data.find(h => h.codigo == codigo);
                setHabitacion(hab);
            })
            .catch(err => console.error(err));
    }, [codigo]);

    const reservar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    codigo_habitacion: codigo,
                    fecha_reserva: fechaReserva,
                    cantidad_dias: cantidadDias,
                    dni_usuario: usuario.dni
                })
            });

            const data = await response.json();

            if (!response.ok) {
                return alert(data.mensaje);
            }

            alert("Reserva realizada correctamente");

            setFechaReserva('');
            setCantidadDias('');

            navigate("/miReserva");

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    }

    console.log("Habitación a reservar:", habitacion);

    return (
        <>
            <div className="reserve-container">

                <h2>Reservar habitación {codigo}</h2>

                <ul className="card-itemContainer" key={habitacion?.codigo}>
                    <li className="fila">
                        <span>Código: </span>
                        <p><strong>{codigo}</strong></p>
                    </li>
                    <li className="fila">
                        <span>Tipo: </span>
                        <p><strong>{habitacion?.tipo}</strong></p>
                    </li>
                    <li className="fila">
                        <span>Descripcion: </span>
                        <p>{habitacion?.descripcion}</p>
                    </li>
                    <li className="fila">
                        <span>Servicios: </span>
                        <p>{habitacion?.servicios}</p>
                    </li>
                    <li className="fila">
                        <span>Costo: </span>
                        <p>{habitacion?.costo}</p>
                    </li>
                </ul>

                <form onSubmit={reservar}>

                    <div>
                        <label>Fecha de reserva</label>
                        <input
                            type="date"
                            value={fechaReserva}
                            onChange={(e) => setFechaReserva(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Cantidad de días</label>
                        <input
                            type="number"
                            value={cantidadDias}
                            onChange={(e) => setCantidadDias(e.target.value)}
                            required
                        />
                    </div>

                    {habitacion && (
                        <div>
                            <p>Costo por día: <strong>${habitacion.costo}</strong></p>
                            <p>Costo total: <strong>${costoTotal}</strong></p>
                        </div>
                    )}

                    <button type="submit">
                        Confirmar reserva
                    </button>

                </form>

            </div>
        </>
    )
}


export default Reservar;