import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './css/layout.css'

function LayoutNav() {

    const navigate = useNavigate();

    // const irPanel = () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    //     if (!usuario) {
    //         navigate("/login");
    //     } else {
    //         navigate("/dashboard");
    //     }
    // };

    return (
        <>
            <nav className="layout-nav">
                <div className="nav-title"><h2>Hotel</h2></div>
                <div className="nav-linksContainer">
                    <ul className="nav-links">
                        <div className="linksContainer fila">
                            <li>
                                <Link to="/">Inicio</Link>
                            </li>

                            <li>
                                <Link to="/listaHabitacion">Habitaciones</Link>
                            </li>

                            <li>
                                <Link to="/login">Login</Link>
                            </li>

                            <li>
                                <Link to="/cuentaUsuario">Panel</Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
};

export default LayoutNav;