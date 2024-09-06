import mysql from "mysql2/promise";

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "Admin123",
  database: "prueba_tecnica_db",
};

export default async function handler(req, res) {
  let connection;

  try {
    connection = await mysql.createConnection(connectionConfig);

    if (req.method === "GET") {
      const { correo, codigoValidacion } = req.query;

      if (correo && codigoValidacion) {
        try {
          const [rows] = await connection.execute(
            "SELECT * FROM usuarios WHERE correo = ? AND codigo_validacion = ?",
            [correo, codigoValidacion]
          );
          return res.status(200).json(rows); 
        } catch (dbError) {
          console.error("Database query error:", dbError);
          return res
            .status(500)
            .json({ error: "Error en la consulta de la base de datos." });
        }
      } else if (correo) {
        try {
          const [rows] = await connection.execute(
            "SELECT * FROM usuarios WHERE correo = ?",
            [correo]
          );
          if (rows.length > 0) {
            return res.status(200).json({ exists: true });
          } else {
            return res.status(200).json({ exists: false });
          }
        } catch (dbError) {
          console.error("Database query error:", dbError);
          return res
            .status(500)
            .json({ error: "Error en la consulta de la base de datos." });
        }
      } else {
        return res
          .status(400)
          .json({ error: "Correo electrónico es requerido." });
      }
    } else if (req.method === "POST") {
      const { usuario, codigoValidacion, celular, correo, ciudad } = req.body;

      if (!usuario || !codigoValidacion || !correo) {
        return res.status(400).json({ error: "Faltan datos requeridos." });
      }

      try {
        const [existingUser] = await connection.execute(
          "SELECT * FROM usuarios WHERE correo = ?",
          [correo]
        );

        if (existingUser.length > 0) {
          return res.status(409).json({ error: "El usuario ya existe." });
        }

        await connection.execute(
          "INSERT INTO usuarios (usuario, codigo_validacion, correo, celular, ciudad) VALUES (?, ?, ?, ?, ?)",
          [usuario, codigoValidacion, correo, celular, ciudad]
        );

        return res
          .status(201)
          .json({ message: "Usuario registrado exitosamente." });
      } catch (dbError) {
        console.error("Database query error:", dbError);
        return res
          .status(500)
          .json({ error: "Error al registrar el usuario." });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Método ${req.method} no permitido.`);
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Error en el servidor." });
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error("Error closing the database connection:", closeError);
      }
    }
  }
}
