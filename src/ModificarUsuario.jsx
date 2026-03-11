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

    const [error, setError] = useState([]);

    // USANDO EL ESTADO DE ERROR PARA VALIDAR LOS CAMPOS DEL FORMULARIO ANTES DE ENVIAR LOS DATOS AL BACKEND

    const validarFormulario = () => {
        let nuevosErrores = {};

        if (name.trim() === "") {
            nuevosErrores.name = "El nombre es obligatorio";
        }

        if (last.trim() === "") {
            nuevosErrores.last = "El apellido es obligatorio";
        }

        if (!email.includes("@")) {
            nuevosErrores.email = "El email no es válido";
        }
        if (password.length < 8) {
            nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres";
        }

        if (password.length > 15) {
            nuevosErrores.password = "La contraseña no puede tener más de 15 caracteres";
        }

        setError(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;

        // DEVUELVE TRUE SI NO HAY ERRORES 

    };


    const actualizarUsuario = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

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
                                    onChange={(e) => {

                                        // CUENTA LA CANTIDAD DE NÚMEROS EN EL CAMPO DE NOMBRE
                                        const value = e.target.value;

                                        // \d = CUALQUIER DIGITO DEL 0 AL 9, g = BUSCAR TODAS LAS COINCIDENCIAS EN LA CADENA
                                        const count = (value.match(/\d/g) || []).length;

                                        // PERMITE INGRESAR NOMBRES CON HASTA 1 NÚMERO, PERO NO MÁS
                                        if (count <= 1) {
                                            setName(value);
                                        }
                                    }}
                                    required
                                />
                                {error.name && (
                                    <p className="texto-error">{error.name}</p>
                                )}
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
                                    onChange={(e) => {

                                        // CUENTA LA CANTIDAD DE NÚMEROS EN EL CAMPO DE NOMBRE
                                        const value = e.target.value;

                                        // \d = CUALQUIER DIGITO DEL 0 AL 9, g = BUSCAR TODAS LAS COINCIDENCIAS EN LA CADENA
                                        const count = (value.match(/\d/g) || []).length;

                                        // PERMITE INGRESAR EL APELLIDO SIN NUMEROS
                                        if (count <= 0) {
                                            setLast(value);
                                        }
                                    }}
                                    required
                                />
                                {error.last && (
                                    <p className="texto-error">{error.last}</p>
                                )}
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
                                {error.email && (
                                    <p className="texto-error">{error.email}</p>
                                )}
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
                                {error.password && (
                                    <p className="texto-error">{error.password}</p>
                                )}
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