const express = require('express');
const { registrarCliente, listarClientes, obtenerCliente, modificarCliente } = require('../controladores/clientesControlador');

const router = express.Router();

router.post('/', registrarCliente);
router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.put('/:id', modificarCliente);

module.exports = router;
