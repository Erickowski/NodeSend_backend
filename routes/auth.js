const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  usuarioAutenticado,
  autenticarUsuario,
} = require("../controllers/authController");

const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password no puede ir vacío").not().isEmpty(),
  ],
  autenticarUsuario
);

router.get("/", auth, usuarioAutenticado);

module.exports = router;
