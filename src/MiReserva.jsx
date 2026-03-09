import { useState, useEffect } from "react";
import { useUsuarioGuardado, useUser } from "./hooks/useUser";
import { useNavigate } from "react-router-dom";
import './css/miReserva.css'

function MiReserva() {

    const [reservas, setReservas] = useState([]);
    const usuario = useUsuarioGuardado();
    const navigate = useNavigate();

    // VERIFICAR SI EL USUARIO ESTA LOGUEADO
    useUser();


    const cancelarReserva = async (codigo) => {

        const confirmar = window.confirm("¿Cancelar esta reserva?");

        if (!confirmar) return;

        try {

            const response = await fetch(`http://localhost:3001/reservas/${codigo}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                alert("Error al cancelar");
                return;
            }

            alert("Reserva cancelada");
            setReservas([]);

        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {

        if (!usuario) return;

        fetch(`http://localhost:3001/reservas/usuario/${usuario.dni}`)
            .then(res => res.json())
            .then(data => setReservas(data))
            .catch(err => console.error(err));

    }, [usuario]);

    return (

        <div>
            <h2>Mis reservas</h2>

            {reservas.length === 0 ? (
                <p>No tienes reservas</p>
            ) : (

                reservas.map((reserva) => (

                    <div key={reserva.codigo_reserva} className="card">

                        <h3>Reserva #{reserva.codigo_reserva}</h3>

                        <p><strong>Fecha:</strong> {reserva.fecha_reserva}</p>
                        <p><strong>Días:</strong> {reserva.cantidad_dias}</p>

                        <h4>Habitación</h4>
                        <p>Código: {reserva.codigo_habitacion}</p>
                        <p>Tipo: {reserva.tipo}</p>
                        <p>Descripción: {reserva.descripcion}</p>
                        <p>Servicios: {reserva.servicios}</p>
                        <p>Costo por día: ${reserva.costo}</p>

                        <h4>Usuario</h4>
                        <p>{reserva.nombre} {reserva.apellido}</p>
                        <p>{reserva.email}</p>
                        <p>DNI: {reserva.dni}</p>

                        <p>
                            <strong>
                                Total: ${reserva.costo * reserva.cantidad_dias}
                            </strong>
                        </p>

                        <button className="btn" onClick={() => cancelarReserva(reserva.codigo_reserva)}>
                            Cancelar reserva
                        </button>

                    </div>

                ))

            )}

        </div>

    );
}

export default MiReserva;