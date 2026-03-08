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

  const handleSubmit = async (e) => {
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
    <div class="login-container">
      <h2 class="nav-provisional" >Registrarse como Administrador</h2>
      <form class="form-signUp" onSubmit={handleSubmit}>
        <div class="container-formItems">
          <label class="form-label" htmlFor="fname">Nombres</label>
          <input
            class="form-input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Tu Nombre"
          />
        </div>
        <div class="container-formItem">
          <label class="form-label" htmlFor="lname">Apellidos</label>
          <input
            class="form-input"
            type="text"
            id="lname"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            required
            placeholder="Tu Apellido"
          />
        </div>
        <div class="container-formItem">
          <label class="form-label" htmlFor="dni">Dni:</label>
          <input
            class="form-input"
            type="number"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            placeholder="Tu DNI"
            
          />
        </div>
        <div class="container-formItem">
          <label class="form-label" htmlFor="birthDate">Fecha de Nacimiento:</label>
          <input
            class="form-input"
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div class="container-formItem">
          <label class="form-label" htmlFor="email">Email:</label>
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
        <div class="container-formItem">
          <label class="form-label" htmlFor="password">Contraseña:</label>
          <input
            class="form-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div class="container-formItem">
          <label class="form-label" htmlFor="country">Nacionalidad</label>
          <select class="form-select" id="country" name="nacionalidad" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Brasil">Brasil</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <button class="form-btnSubmit" type="submit">Registrarse</button>
      </form>
      <footer>
        <p>¿Ya tenes una Cuenta?<Link to="/login">Inicia sesión aquí</Link></p>
      </footer>
    </div>
  );
}

export default RegisterAdmin;
