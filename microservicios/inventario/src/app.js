require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const rutasInventario = require('./rutas/rutasInventario');
const { registrarServicio } = require('./consul');
const sequelize = require('./config');

const app = express();

const PUERTO = process.env.PUERTO_SERVICIO || 3000;

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use(bodyParser.json());
app.use('/api/inventario', rutasInventario);

sequelize.sync()
    .then(() => {
        app.listen(PUERTO, () => {
            console.log(`Servicio ${process.env.NOMBRE_SERVICIO} ejecutándose en el puerto ${PUERTO}`);
            registrarServicio();
        });
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });
