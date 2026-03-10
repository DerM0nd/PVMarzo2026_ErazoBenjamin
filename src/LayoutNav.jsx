import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './css/layout.css'

function LayoutNav() {

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return (
        <>
            <nav className="layout-nav">
                <div className="nav-title"><h2>Hotel</h2></div>
                <div className="nav-linksContainer">
                    <ul className="nav-links">
                        <div className="linksContainer fila">
                            <div className="link-containerFlex">
                                <li className="link">
                                <Link to="/">Inicio</Link>
                                </li>
                            </div>

                            <div className="link-containerFlex">
                                <li className="link">
                                <Link to="/listaHabitacion">Habitaciones</Link>
                                </li>
                            </div>

                            <div className="link-containerFlex">
                                <li className="link">
                                <Link to="/login">Login</Link>
                                </li>
                            </div>

                            <div className="link-containerFlex">
                                <li className="link">
                                <Link to="/cuentaUsuario">Panel</Link>
                                </li>
                            </div>
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