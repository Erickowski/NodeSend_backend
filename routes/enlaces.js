const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  nuevoEnlace,
  obtenerEnlace,
} = require("../controllers/enlacesController");
const { eliminarArchivo } = require("../controllers/archivosController");

const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("nombre", "Sube un archivo").not().isEmpty(),
    check("nombre_original", "Sube un archivo").not().isEmpty(),
  ],
  auth,
  nuevoEnlace
);

router.get("/:url", obtenerEnlace, eliminarArchivo);

module.exports = router;
