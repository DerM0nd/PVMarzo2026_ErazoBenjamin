import { useEffect, useState } from 'react'
import './css/cuenta.css'
import './css/modificar.css'
import { useNavigate } from "react-router-dom";

function ModificarUsuario() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);

    const [name, setName] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(usuarioGuardado);
    }, []);

    const actualizarUsuario = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/usuario/${usuario.dni}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: name,
                    apellido: last,
                    email,
                    password
                })
            });
            const data = await response.json();

            console.log(data.mensaje);

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al actualizar el usuario");
            }
            // Actualizar el usuario en localStorage
            const usuarioActualizado = { ...usuario, nombre: name, apellido: last, email, password };
            localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
            navigate("/cuentaUsuario");
        } catch (err) {
            console.error("Network or unexpected error:", err);
        }
    };

    if (!usuario) {
        return <p>Cargando usuario...</p>;
    }

    return (
        <>
            <div className="h3-container">
                <h3>Detalles del usuario</h3>
                <h3></h3>
            </div>

            <div className="fila">
                <h6>DNI</h6>
                <p>{usuario.dni}</p>
            </div>

            <div className="fila">
                <h6>Tipo de Usuario</h6>
                <p>{usuario.tipo}</p>
            </div>


            <div className='form-container'>
                <form className='form-mod' onSubmit={actualizarUsuario}>
                    <div className="custom-cardContainer">
                        <div className="card" id="card">

                            <div className="fila">
                                <h6>Nombre</h6>
                                <p>{usuario.nombre}</p>
                            </div>
                            <div className='fila'>
                                <label htmlFor="fname">Nuevo nombre</label>
                                <input
                                    type="text"
                                    id="fname"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="fila">
                                <h6>Apellido</h6>
                                <p>{usuario.apellido}</p>
                            </div>
                            <div className='fila'>
                                <label htmlFor="lname">Nuevo apellido</label>
                                <input
                                    type="text"
                                    id="lname"
                                    value={last}
                                    onChange={(e) => setLast(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="fila">
                                <h6>Email</h6>
                                <p>{usuario.email}</p>
                            </div>
                            <div className='fila'>
                                <label htmlFor="email">Nuevo email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="fila">
                                <h6>Contraseña</h6>
                                <p>{usuario.password}</p>
                            </div>
                            <div className='fila'>
                                <label htmlFor="password">Nueva contraseña:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit">Actualizar usuario</button>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}


export default ModificarUsuario;