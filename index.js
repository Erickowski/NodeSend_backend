const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

// Crear servidor
const app = express();

// Habilitar Cors
const opcionesCors = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(opcionesCors));

// conectar la base de datos
conectarDB();

// Habilitar leer los valores de body
app.use(express.json());

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Rutas de la app
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));
app.use("/api/archivos", require("./routes/archivos"));

// Arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
