const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");

const Enlace = require("../models/Enlace");

exports.subirArchivo = async (req, res, next) => {
  const configuracionMulter = {
    limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        // Separar por / y obtener el tipo de archivo
        // const extension = file.mimetype.split("/")[1];
        // Más eficiente, extraemos la extensión del nombre
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(configuracionMulter).single("archivo");

  upload(req, res, async (error) => {
    // console.log(req.file);
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.eliminarArchivo = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("Archivo eliminado.");
  } catch (error) {
    console.log(error);
  }
};

// Descargando archivo
exports.descargarArchivo = async (req, res, next) => {
  const { archivo } = req.params;

  const enlace = await Enlace.findOne({ nombre: archivo });

  const archivoDescarga = __dirname + "/../uploads/" + archivo;
  res.download(archivoDescarga);

  // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
  const { descargas, nombre, id } = enlace;

  if (descargas === 1) {
    console.log("Si solo 1");
    // Eliminar el archivo
    req.archivo = nombre;
    // Eliminar la entrada de la BD
    await Enlace.findOneAndRemove(id);
    next();
  } else {
    // Si las descargas son > 1 - Restar 1
    enlace.descargas--;
    await enlace.save();
  }
};
