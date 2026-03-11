import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
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
    
    if (dni.length < 6 || dni.length > 9) {
      nuevosErrores.dni = "El DNI debe tener entre 6 y 9 dígitos";
    }

    if (birthDate.trim() === "") {
      nuevosErrores.birthDate = "La fecha de nacimiento es obligatoria";
    } else if (!esMayor(birthDate)) {
      nuevosErrores.birthDate = "Debes ser mayor de 18 años para registrarte";
    }

    if (password.length < 8) {
      nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (password.length > 15) {
      nuevosErrores.password = "La contraseña no puede tener más de 15 caracteres";
    }

    if (!email.includes("@")) {
      nuevosErrores.email = "El email no es válido";
    }

    setError(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;

    // DEVUELVE TRUE SI NO HAY ERRORES 

  };


  // FUNCION PARA VER SI EL USUARIO ES MAYOR DE EDAD, USANDO LA LIBRERÍA DAYJS

  const esMayor = (fecha) => {
    return dayjs().diff(dayjs(fecha), "year") >= 18;
  };

  // --------------------------------------------------------------------------------------------



  const registrarUsuario = async (e) => {
    e.preventDefault();

    // IMPIDE QUE SE ENVÍE EL FORMULARIO SI HAY ERRORES

    if (!validarFormulario()) {
      return;
    }

    // --------------------------------------------------


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
  }


  return (
    <>
      <div className="signUp-title-container"><h2 className="signUp-title">Registrarse como Administrador</h2></div>
      <div className="signUp-login-container">
        <form className="form-signUp" onSubmit={registrarUsuario}>
          <div className="signUp-formDiv">
            <label className="signUp-fname">Nombres</label>
            <input
              className="signUpform-input"
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
            {/* EJECUTA EL ERROR MOSTRANDO COMO TEXTO DEBAJO DEL INPUT */}
            {error.name && (
              <p className="texto-error">{error.name}</p>
            )}
            {/* -------------------------------------------------------- */}
          </div>
          <div className="signUp-formDiv">
            <label className="signUp-lname">Apellidos</label>
            <input
              className="signUpform-input"
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
            {/* -------------------------------------------------------- */}
            {error.last && (
              <p className="texto-error">{error.last}</p>
            )}
            {/* -------------------------------------------------------- */}
          </div>
          <div className="signUp-formDiv">
            <label className="signUp-dni">Dni:</label>
            <input
              className="signUpform-input"
              type="text"
              id="dni"
              value={dni}

              // REEMPLAZA CUALQUIER CARACTER QUE NO SEA UN NÚMERO POR UNA CADENA VACÍA
              onChange={(e) => {

                // \D = CUALQUIER CARACTER QUE NO SEA UN DIGITO, g = BUSCAR TODAS LAS COINCIDENCIAS EN LA CADENA, SLICE POR SI CUALQUIER OTRA VERIFICACION FALLA
                const value = e.target.value.replace(/\D/g, "").slice(0,8);
                setDni(value);
              }}
              // --------------------------------------------

              required
            />

            {/* MUESTRA EL MENSAJE DE ERROR SI EL DNI NO CUMPLE CON LOS REQUISITOS DE LONGITUD */}
            {error.dni && (
              <p className="texto-error">{error.dni}</p>
            )}
            {/* // ---------------------------------------------------------------- */}

          </div>
          <div className="signUp-formDiv">
            <label className="signUp-birthDate">Fecha de Nacimiento:</label>
            <input
              className="signUpform-input"
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
            {/* -------------------------------------------------------- */}
            {error.birthDate && (
              <p className="texto-error">{error.birthDate}</p>
            )}
            {/* -------------------------------------------------------- */}
          </div>
          <div className="signUp-formDiv">
            <label className="signUp-email">Email:</label>
            <input
              className="signUpform-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* -------------------------------------------------------- */}
            {error.email && (
              <p className="texto-error">{error.email}</p>
            )}
            {/* -------------------------------------------------------- */}
          </div>
          <div className="signUp-formDiv">
            <label className="signUp-password">Contraseña:</label>
            <input
              className="signUpform-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* -------------------------------------------------------- */}
            {error.password && (
              <p className="texto-error">{error.password}</p>
            )}
            {/* -------------------------------------------------------- */}
          </div>
          <div className="signUp-formDiv">
            <label className="form-label" htmlFor="signUp-country">Nacionalidad</label>
            <select className="signUpform-select" id="signUp-country" name="nacionalidad" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Brasil">Brasil</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="signUp-btnContainer"><button className="form-btnSubmit signUp-btn" type="submit">Registrarse</button></div>
        </form>
      </div>
      <div className="signUp-div-footer">
        <p className="signUp-link">¿Ya tenes una Cuenta?<Link to="/login">Inicia sesión aquí</Link></p>
      </div>
    </>
  );
}

export default RegisterAdmin;
