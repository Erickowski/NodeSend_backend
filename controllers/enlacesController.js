const Enlace = require("../models/Enlace");
const shortid = require("shortid");

exports.nuevoEnlace = async (req, res, next) => {
  // Revisar si hay errores

  // Crear un objeto
  const { nombre_original, password } = req.body;

  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;
  enlace.password = password;

  // Almacenar en la BD
  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};
