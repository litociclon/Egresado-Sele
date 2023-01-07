const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//Rutas
//Listado de todos los usuarios
router.get('/', usersAPIController.list);
//Detalle del usuarios
router.get('/:id', usersAPIController.detail);

//Agregar un usuarios
router.post('/create', usersAPIController.create);
//Modificar un usuarios
router.put('/update/:id', usersAPIController.update);
//Eliminar un usuarios
router.delete('/delete/:id', usersAPIController.destroy);

module.exports = router;