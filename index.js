const express = require("express");
const conectarDB = require("./config/db");

// Crear servidor
const app = express();

// conectar la base de datos
conectarDB();

// Habilitar leer los valores de body
app.use(express.json());

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Rutas de la app
app.use("/api/usuarios", require("./routes/usuarios"));

// Arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
