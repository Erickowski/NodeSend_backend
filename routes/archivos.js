const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  subirArchivo,
  eliminarArchivo,
} = require("../controllers/archivosController");

const auth = require("../middleware/auth");

router.post("/", subirArchivo);

router.delete("/:id", eliminarArchivo);

module.exports = router;
