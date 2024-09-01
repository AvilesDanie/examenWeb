const express = require('express');
const { registrarVenta } = require('../controladores/ventasControlador');

const router = express.Router();

router.post('/', registrarVenta);

module.exports = router;
