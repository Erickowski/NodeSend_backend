const express = require("express");
const router = express.Router();
const { nuevoUsuario } = require("../controllers/usuarioController");

router.post("/", nuevoUsuario);

module.exports = router;
