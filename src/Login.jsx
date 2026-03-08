import { useState } from 'react'
import './css/login.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
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
            <div className="form-container">
                <div className="text-container"><h2>Iniciar Sesión</h2></div>
                <form className="form-login" onSubmit={handleSubmit}>
                    <div className="container-formItems">
                        <label className="form-label" htmlFor="femail">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            id="femail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div class="container-formItem">
                        <label className="form-label" htmlFor="fpassword">Contraseña</label>
                        <input
                            className="form-input"
                            type="password"
                            id="fpassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="form-btnSubmit" type="submit">Iniciar Sesión</button>
                </form>
                <p>¿No tenes una Cuenta?<Link to="/">Registrate aca</Link></p>
            </div>
        </>
    )

};

export default Login