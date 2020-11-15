const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  subirArchivo,
  descargarArchivo,
  eliminarArchivo,
} = require("../controllers/archivosController");

const auth = require("../middleware/auth");

router.post("/", auth, subirArchivo);
router.get("/:archivo", descargarArchivo, eliminarArchivo);

module.exports = router;
