const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  subirArchivo,
  descargarArchivo,
} = require("../controllers/archivosController");

const auth = require("../middleware/auth");

router.post("/", auth, subirArchivo);
router.get("/:archivo", descargarArchivo);

module.exports = router;
