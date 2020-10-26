const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const Usuario = require("../models/Usuario");

exports.autenticarUsuario = async (req, res, next) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  // Buscar el usuario en la base de datos
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe." });
    return next();
  }

  // Verificar el password y autenticar el usuario
  if (bcrypt.compareSync(password, usuario.password)) {
    // Crear JWT
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
      },
      process.env.SECRETA,
      {
        expiresIn: "8h",
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ msg: "La contraseña es incorrecta." });
  }
};

exports.usuarioAutenticado = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    // Obtener el token
    const token = authHeader.split(" ")[1];
    // Comprobamos el JWT
    const usuario = jwt.verify(token, process.env.SECRETA);

    res.json({usuario});
  } else {
    console.log(error);
    console.log('JWT no válido.');
  }
  return next();
};
