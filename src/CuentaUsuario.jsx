import { useState } from "react";
import { useEffect } from "react";
import './css/cuenta.css'

function CuentaUsuario() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(usuarioGuardado);
    }, []);

    if (!usuario) {
        return <p>Cargando usuario...</p>;
    }

    return (
        <>
            <div className="h3-container">
                <h3>Detalle del usuario</h3>
                <h3></h3>
            </div>

            <div className="custom-cardContainer">
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

                </div>
            </div>
        </>
    );
}

export default CuentaUsuario;