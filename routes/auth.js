const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  usuarioAutenticado,
  autenticarUsuario,
} = require("../controllers/authController");

router.post("/", autenticarUsuario);

router.get("/", usuarioAutenticado);

module.exports = router;
