const express = require("express");
const path = require('path');
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);

router.get("/pruebajs", mainController.test);
//router.get("/login" , mainController.login)
//router.get("/register" , mainController.register)

//router.get("/create/", mainController.create);

/*router.get("/vistaProducto", mainController.vistaProducto);

router.get("/carrito", mainController.carrito);

*/



module.exports = router;
