import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


// DATOS PARA CONECTARSE A MYSQL
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

app.get("/reserva", (req, res) => {
  db.query("SELECT * FROM reservas", (err, result) => {
    res.json(result);
  });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});

// ----------------------CARGAR DATOS-------------------

// CREANDO USUARIO

app.post("/usuarios", (req, res) => {

  const { dni, apellido, nombre, fecha_nacimiento, tipo, nacionalidad, email, password } = req.body;

  // VALIDANDO EL DNI
  if (!dni || dni.length < 6 || dni.length > 9) {
    return res.status(400).json({
      error: "El DNI debe tener entre 6 y 9 dígitos"
    });
  }

  const count = (nombre.match(/\d/g) || []).length;

  if (count > 1) {
    return res.status(400).json({ error: "El nombre solo puede tener un número" });
  }

  if (!password || password.length < 8 || password.length > 20) {
    return res.status(400).json({ error: "La contraseña debe tener entre 8 y 20 caracteres" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email requerido" });
  }

  const sql = "INSERT INTO usuarios (dni, apellido, nombre, fecha_nacimiento, tipo, nacionalidad, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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
      res.status(500).json({
        mensaje: "Credenciales incorrectas"
      });
    }

  });
});

// MODIFICANDO USUARIO

app.put("/usuario/:dni", (req, res) => {

  const dni = req.params.dni;
  const { nombre, apellido, email, password } = req.body;

  const sql = "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, password = ? WHERE dni = ?";

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

// CREANDO HABITACION

app.post("/habitaciones", (req, res) => {

  const {
    tipo,
    servicios,
    descripcion,
    costo,
    estado
  } = req.body;
  const sql = "INSERT INTO habitaciones (tipo, servicios, descripcion, costo, estado) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [tipo, servicios, descripcion, costo, estado],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ mensaje: "Habitación creada correctamente" });
      }
    }
  );

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

  const { codigo_habitacion, fecha_reserva, cantidad_dias, dni_usuario } = req.body;

  const sqlVerificar = "SELECT * FROM reservas WHERE dni_usuario = ?";

  db.query(sqlVerificar, [dni_usuario], (err, result) => {

    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(500).json({
        mensaje: "El usuario ya tiene una reserva activa"
      });
    }

    const sql = "INSERT INTO reservas (codigo_habitacion, fecha_reserva, cantidad_dias, dni_usuario) VALUES (?, ?, ?, ?)";

    db.query(sql,
      [codigo_habitacion, fecha_reserva, cantidad_dias, dni_usuario],
      (err, result) => {

        if (err) return res.status(500).json(err);

        const sqlEstado = "UPDATE habitaciones SET estado = 'ocupada' WHERE codigo = ?";

        db.query(sqlEstado, [codigo_habitacion]);

        res.json({
          mensaje: "Reserva creada correctamente"
        });

      });

  });

});

// LISTANDO RESERVA

app.get("/habitaciones/:codigo", (req, res) => {

  const codigo = req.params.codigo;

  const sql = "SELECT * FROM habitaciones WHERE codigo = ?";

  db.query(sql, [codigo], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);

  });

});



// CANCELAR RESERVA

app.delete("/reservas/:codigo", (req, res) => {

  const codigo = req.params.codigo;

  const sqlBuscar = "SELECT codigo_habitacion FROM reservas WHERE codigo = ?";

  db.query(sqlBuscar, [codigo], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(500).json({
        mensaje: "Reserva no encontrada"
      });
    }

    const habitacion = result[0].codigo_habitacion;

    const sqlEliminar = "DELETE FROM reservas WHERE codigo = ?";

    db.query(sqlEliminar, [codigo], (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      const sqlLiberar = "UPDATE habitaciones SET estado = 'disponible' WHERE codigo = ?";

      db.query(sqlLiberar, [habitacion]);

      res.json({
        mensaje: "Reserva cancelada correctamente"
      });

    });

  });

});


// VER RESERVAS HECHAS

app.get("/reservas/usuario/:dni", (req, res) => {

  const dni = req.params.dni;

  const sql = `
        SELECT 
            r.codigo AS codigo_reserva,
            r.fecha_reserva,
            r.cantidad_dias,

            h.codigo AS codigo_habitacion,
            h.tipo,
            h.descripcion,
            h.servicios,
            h.costo,

            u.nombre,
            u.apellido,
            u.email,
            u.dni

        FROM reservas r
        JOIN habitaciones h 
            ON r.codigo_habitacion = h.codigo
        JOIN usuarios u 
            ON r.dni_usuario = u.dni
        WHERE r.dni_usuario = ?
    `;

  db.query(sql, [dni], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

});
