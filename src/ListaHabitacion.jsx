import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/habitacion.css'

function ListaHabitacion() {
    const [habitaciones, setHabitaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/habitaciones")
            .then(res => res.json())
            .then(data => setHabitaciones(data))
            .catch(err => console.error(err));
    }, []);

    const reservar = (codigo) => {
        navigate(`/reservar/${codigo}`);
    };

    return (
        <>
            <div>
                <h2>Habitaciones</h2>

                {habitaciones.length === 0 ? (
                    <p>No hay habitaciones registradas.</p>
                ) : (
                    <div className="hab-cardContainer">
                        <div className="cardList">
                            {habitaciones.map((hab) => (
                                <ul className="card-itemContainer" key={hab.codigo}>
                                    <li className="fila">
                                        <span>Código: </span>
                                        <p><strong>{hab.codigo}</strong></p>
                                    </li>
                                    <li className="fila">
                                        <span>Tipo: </span>
                                        <p><strong>{hab.tipo}</strong></p>
                                    </li>
                                    <li className="fila">
                                        <span>Descripcion: </span>
                                        <p>{hab.descripcion}</p>
                                    </li>
                                    <li className="fila">
                                        <span>Servicios: </span>
                                        <p>{hab.servicios}</p>
                                    </li>
                                    <li className="fila">
                                        <span>Costo: </span>
                                        <p>{hab.costo}</p>
                                    </li>
                                    <li className="fila estado">
                                        <span>{hab.estado}</span>
                                    </li>
                                    <button className="btn" onClick={() => reservar(hab.codigo)}>Reservar</button>
                                </ul>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <button className="btn" onClick={() => navigate("/cargarHabitacion")}>
                        Cargar Habitación
                    </button>
                </div>
            </div>
        </>
    )
}


export default ListaHabitacion;