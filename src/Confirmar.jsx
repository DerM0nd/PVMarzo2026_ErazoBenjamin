import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import './css/confirmar.css'

function Connfirmacion() {
    const { accion } = useParams();
    const navigate = useNavigate();

    useUser();

    const titulos = {
        logout: {
            titulo: "Cerrar sesión",
            mensaje: "¿Seguro que deseas cerrar sesión?"
        },
        eliminar: {
            titulo: "Eliminar cuenta",
            mensaje: "Esta acción eliminará tu cuenta permanentemente."
        },
        modificar: {
            titulo: "Modificar datos",
            mensaje: "¿Deseas continuar para modificar tus datos?"
        }
    };

    const confirmarAccion = () => {

        if (accion === "logout") {
            localStorage.removeItem("usuario");
            navigate("/login");
        }
        if (accion === "modificar") {
            navigate("/modificarUsuario");
        }
        if (accion === "eliminar") {
            async () => {
                try {
                    const response = await fetch(`http://localhost:3001/usuario/${usuario.dni}`, {
                        method: "DELETE"
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.mensaje || "Error al eliminar cuenta");
                    }
                    alert("Cuenta eliminada correctamente");

                    localStorage.removeItem("usuario");

                    navigate("/");
                } catch (error) {
                    console.error(error);
                    alert("Error al eliminar la cuenta");
                }
            }
        }

    };

    const cancelar = () => {
        navigate(-1);
    };

    const data = titulos[accion] || {
        titulo: "Confirmación",
        mensaje: "¿Deseas continuar?"
    };

    return (
        <>
            <div className="divContainer">
                <div className="item-container">

                    <h2>{data.titulo}</h2>
                    <p>{data.mensaje}</p>

                    <div className="btn-container">

                        <button className="btn-confirmar btn" onClick={confirmarAccion}>
                            Confirmar
                        </button>
                        <button className="btn-cancelar btn" onClick={cancelar}>
                            Cancelar
                        </button>

                    </div>
                </div>
            </div>
        </>
    )

}


export default Connfirmacion;