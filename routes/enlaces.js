const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { nuevoEnlace } = require("../controllers/enlacesController");

const auth = require("../middleware/auth");

router.post("/", nuevoEnlace);

module.exports = router;
