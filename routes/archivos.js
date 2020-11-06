const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { subirArchivo } = require("../controllers/archivosController");

const auth = require("../middleware/auth");

router.post("/", auth, subirArchivo);

module.exports = router;
