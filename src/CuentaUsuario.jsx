import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/cuenta.css'

function CuentaUsuario() {
    const [usuario, setUsuario] = useState(null);

    const navigate = useNavigate();

    const irAModificar = () => {
        navigate("/modificarUsuario");
    };

    useEffect(() => {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(usuarioGuardado);
    }, []);

    if (!usuario) {
        return <p>Cargando usuario...</p>;
    }

    const eliminarCuenta = async () => {

        const confirmar = window.confirm("¿Seguro que deseas eliminar tu cuenta?");

        if (!confirmar) return;

        const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));

        try {

            const response = await fetch(`http://localhost:3001/usuario/${usuario.dni}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al eliminar cuenta");
            }

            alert("Cuenta eliminada correctamente");

            localStorage.clear();

            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("Error al eliminar la cuenta");
        }
    };

    return (
        <>
            <div className="h3-container">
                <h3>Detalle del usuario</h3>
                <h3></h3>
            </div>

            <div className="custom-detailsContainer">
                <div className="card" id="card">

                    <div className="fila">
                        <h6>Nombre</h6>
                        <p>{usuario.nombre}</p>
                    </div>

                    <div className="fila">
                        <h6>Apellido</h6>
                        <p>{usuario.apellido}</p>
                    </div>

                    <div className="fila">
                        <h6>Email</h6>
                        <p>{usuario.email}</p>
                    </div>

                    <div className="fila">
                        <h6>DNI</h6>
                        <p>{usuario.dni}</p>
                    </div>

                    <div className="fila">
                        <h6>Tipo de Usuario</h6>
                        <p>{usuario.tipo}</p>
                    </div>

                    <div className="botones-cuenta">

                        <button onClick={irAModificar}>
                            Modificar datos
                        </button>

                        <button onClick={eliminarCuenta} className="btn-eliminar">
                            Eliminar cuenta
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}

export default CuentaUsuario;