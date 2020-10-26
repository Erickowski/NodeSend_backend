const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    // Obtener el token
    const token = authHeader.split(" ")[1];
    // Comprobamos el JWT
    const usuario = jwt.verify(token, process.env.SECRETA);

    req.usuario = usuario;
  } else {
    console.log(error);
    console.log("JWT no válido.");
  }
  return next();
};
