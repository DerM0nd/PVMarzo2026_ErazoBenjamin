import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './css/signUp.css'


function RegisterAdmin() {
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [type, setType] = useState('administrador');
  const [birthDate, setBirthDate] = useState('');
  const navigate = useNavigate();


  //----------------------------FUNCION PARA REGISTRAR USUARIOS------------------//

  const registrarUsuario = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dni: dni,
          nombre: name,
          apellido: last,
          fecha_nacimiento: birthDate,
          nacionalidad: country,
          password: password,
          email: email,
          tipo: "administrador",
          estado: "inactivo"
        })
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.error("Registration failed:", data);
        return;
      }
      navigate("/login");
    } catch (err) {
      console.error("Network or unexpected error:", err);
    }
  };


  //----------------------CUERPO DE LA PAGINA-------------------------------------------//

  return (
    <>
    <div className="signUp-title-container"><h2 className="singUp-title">Registrarse como Administrador</h2></div>
    <div className="signUp-login-container">
      <form className="form-signUp" onSubmit={registrarUsuario}>
        <div className="signUp-formDiv">
          <label className="signUp-fname">Nombres</label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Tu Nombre"
          />
        </div>
        <div className="signUp-formDiv">
          <label className="signUp-lname">Apellidos</label>
          <input
            className="form-input"
            type="text"
            id="lname"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            required
            placeholder="Tu Apellido"
          />
        </div>
        <div className="signUp-formDiv">
          <label className="signUp-dni">Dni:</label>
          <input
            className="form-input"
            type="number"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            placeholder="Tu DNI"
            
          />
        </div>
        <div className="signUp-formDiv">
          <label className="signUp-birthDate">Fecha de Nacimiento:</label>
          <input
            class="form-input"
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div className="signUp-formDiv">
          <label className="signUp-email">Email:</label>
          <input
            class="form-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Tu Email"
          />
        </div>
        <div className="signUp-formDiv">
          <label className="signUp-password">Contraseña:</label>
          <input
            className="form-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signUp-formDiv">
          <label className="form-label" htmlFor="signUp-country">Nacionalidad</label>
          <select className="form-select" id="signUp-country" name="nacionalidad" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Brasil">Brasil</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="singUp-btnContainer"><button className="form-btnSubmit signUp-btn" type="submit">Registrarse</button></div>
      </form>
      <div className="signUp-div-footer">
        <p className="signUp-link">¿Ya tenes una Cuenta?<Link to="/login">Inicia sesión aquí</Link></p>
      </div>
    </div>
    </>
  );
}

export default RegisterAdmin;
