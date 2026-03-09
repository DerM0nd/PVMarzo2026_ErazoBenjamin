import { useNavigate } from "react-router-dom";
import { useUser, useUsuarioGuardado } from "./hooks/useUser";
import './css/cuenta.css'

function CuentaUsuario() {
    const navigate = useNavigate();
    
    // VERIFICAR SI EL USUARIO ESTA LOGUEADO
    useUser();


    // CARGAR USUARIO DESDE LOCALSTORAGE
    const usuario = useUsuarioGuardado();
    // SI NO HAY USUARIO, MOSTRAR MENSAJE DE CARGANDO
    if (!usuario) {
        return <p>Cargando usuario...</p>;
    }


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
                        <button className="btn" onClick={() => navigate("/confirmacion/modificar")}>
                            Modificar datos
                        </button>
                        <button className="btn" onClick={() => navigate("/confirmacion/eliminar")}>
                            Eliminar cuenta
                        </button>

                    </div>
                </div>
            </div>

            <button className="btn" onClick={() => navigate("/confirmacion/logout")}>
                Cerrar sesión
            </button>
        </>
    );
}

export default CuentaUsuario;