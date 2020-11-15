const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  nuevoEnlace,
  obtenerEnlace,
  todosEnlaces,
  tienePassword,
  verificarPassword,
} = require("../controllers/enlacesController");

const auth = require("../middleware/auth");

router.get("/", todosEnlaces);

router.post(
  "/",
  [
    check("nombre", "Sube un archivo").not().isEmpty(),
    check("nombre_original", "Sube un archivo").not().isEmpty(),
  ],
  auth,
  nuevoEnlace
);

router.get("/:url", tienePassword, obtenerEnlace);

router.post("/:url", verificarPassword, obtenerEnlace);

module.exports = router;
