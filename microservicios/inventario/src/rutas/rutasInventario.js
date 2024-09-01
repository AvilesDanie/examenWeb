const express = require('express');
const { registrarProducto, listarTodosLosProductos, obtenerProducto, modificarProducto, actualizarStock} = require('../controladores/inventarioControlador');

const router = express.Router();

router.post('/', registrarProducto);
router.get('/', listarTodosLosProductos);
router.get('/:id', obtenerProducto);
router.put('/:id', modificarProducto);
router.patch('/:id', actualizarStock);

module.exports = router;
