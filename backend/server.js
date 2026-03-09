import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "benja",
  password: "azd426jml",
  database: "db_hotel"
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado a MySQL");
  }
});

app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, result) => {
    res.json(result);
  });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});

// ----------------------CARGAR DATOS-------------------

// CREANDO USUARIO

app.post("/usuarios", (req, res) => {

  const {
    dni,
    apellido,
    nombre,
    fecha_nacimiento,
    tipo,
    nacionalidad,
    email,
    password
  } = req.body;

  const sql = `
    INSERT INTO usuarios
    (dni, apellido, nombre, fecha_nacimiento, tipo, nacionalidad, email, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [dni, apellido, nombre, fecha_nacimiento, tipo, nacionalidad, email, password],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      }
      else {
        res.json({ mensaje: "Usuario creado correctamente" });
      }
    }
  );
});

// LOGEANDO USUARIO

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      res.status(500).json(err);
      return;
    }

    if (result.length > 0) {
      res.json({
        mensaje: "Login correcto",
        usuario: result[0]
      });
    } else {
      res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

  });
});

// MODIFICANDO USUARIO

app.put("/usuario/:dni", (req, res) => {

    const dni  = req.params.dni;
    const { nombre, apellido, email, password } = req.body;

    const sql = `UPDATE usuarios
        SET nombre = ?, apellido = ?, email = ?, password = ?
        WHERE dni = ?`;

    db.query(sql, [nombre, apellido, email, password, dni], (err, result) => {

        if (err) {
            res.status(500).json(err);
            return;
        }

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    });

});


// ELIMINANDO USUARIO

app.delete("/usuario/:dni", (req, res) => {

    const { dni } = req.params;

    const sql = "DELETE FROM usuarios WHERE dni = ?";

    db.query(sql, [dni], (err, result) => {

        if (err) {
            res.status(500).json(err);
            return;
        }

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    });

});

// LISTANDO HABITACIONES DISPONIBLES

app.get("/habitaciones", (req, res) => {

  const sql = "SELECT * FROM habitaciones WHERE estado = 'disponible'";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });

});

// CREANDO RESERVA

app.post("/reservas", (req, res) => {

  const { fecha_reserva, cantidad_dias, dni_usuario, codigo_habitacion } = req.body;

  const sql = `
    INSERT INTO reservas
    (fecha_reserva, cantidad_dias, dni_usuario, codigo_habitacion)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [fecha_reserva, cantidad_dias, dni_usuario, codigo_habitacion],
    (err, result) => {

      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ mensaje: "Reserva creada correctamente" });
      }

    }
  );
});

//
