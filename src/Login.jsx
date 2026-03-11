import { useState } from 'react'
import './css/login.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const guardarUsuario = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                //GUARDA EL USUARIO EN LOCALSTORAGE
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                console.log("Login correcto:", data.usuario);
                //REDIRECCIONA A LA PAGINA DEL USUARIO
                navigate("/cuentaUsuario");
            } else {
                console.log("Error:", data.mensaje);
            }

        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
        }
    };

    return (
        <>
        <div className="text-container"><h2>Iniciar Sesión</h2></div>
            <div className="loginform-container">
                <form className="login-form" onSubmit={guardarUsuario}>
                    <div className="logincontainer-formItem">
                        <label className="form-label" htmlFor="femail">Email</label>
                        <input
                            className="loginform-input"
                            type="email"
                            id="femail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="logincontainer-formItem">
                        <label className="form-label" htmlFor="fpassword">Contraseña</label>
                        <input
                            className="loginform-input"
                            type="password"
                            id="fpassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="loginform-btnSubmitContainer"><button className="form-btnSubmit loginform-btnSubmit" type="submit">Iniciar Sesión</button></div>
                </form>
            </div>
            <p>¿No tenes una Cuenta?<Link to="/registrarAdmin">Registrate aca para administrador</Link></p>
            <p><Link to="/registrarPasajero">Registrate aca para pasajero</Link></p>
        </>
    )

};

export default Login