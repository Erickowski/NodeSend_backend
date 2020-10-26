const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { nuevoUsuario } = require("../controllers/usuarioController");

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "Agrega un email válido.").isEmail(),
    check(
      "password",
      "El password debe ser de al menos seis caracteres."
    ).isLength({ min: 6 }),
  ],
  nuevoUsuario
);

module.exports = router;
