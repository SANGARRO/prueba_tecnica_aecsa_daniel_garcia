const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin123",
  database: "prueba_tecnica_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});


app.post("/api/usuarios", (req, res) => {
  const { usuario, codigoValidacion, celular, correo, ciudad } = req.body;

  const checkUserSql = "SELECT * FROM usuarios WHERE correo = ?";
  connection.query(checkUserSql, [correo], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      res.status(500).json({ message: "Error checking user" });
      return;
    }
    if (results.length > 0) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const sql =
        "INSERT INTO usuarios (usuario, codigo_validacion, celular, correo, ciudad) VALUES (?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [usuario, codigoValidacion, celular, correo, ciudad],
        (err, results) => {
          if (err) {
            console.error("Error registering user:", err);
            res.status(500).json({ message: "Error registering user" });
            return;
          }
          res.status(201).json({ message: "Usuario registrado exitosamente" });
        }
      );
    }
  });
});

app.get("/api/usuarios", (req, res) => {
  const { correo, codigoValidacion } = req.query;
  const sql =
    "SELECT * FROM usuarios WHERE correo = ? AND codigo_validacion = ?";
  connection.query(sql, [correo, codigoValidacion], (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Error fetching users" });
      return;
    }
    res.status(200).json(results);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
