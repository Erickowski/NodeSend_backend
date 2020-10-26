const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const Usuario = require("../models/Usuario");

exports.autenticarUsuario = async (req, res, next) => {
  // Revisar si hay errores
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

exports.usuarioAutenticado = (req, res) => {};
