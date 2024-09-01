const Consul = require('consul');

const consul = new Consul({
    host: process.env.CONSUL_HOST || 'localhost',
    port: 8500,
});

const nombreServicio = process.env.NOMBRE_SERVICIO;

const registrarServicio = () => {
    const servicio = {
        name: process.env.NOMBRE_SERVICIO,
        address: process.env.IP_SERVICIO,
        port: parseInt(process.env.PUERTO_SERVICIO, 10),
        check: {
            http: `http://${process.env.IP_SERVICIO}:${process.env.PUERTO_SERVICIO}/health`,
            interval: '10s',
            timeout: '5s'
        }
    };

    console.log('Registrando servicio:', servicio);

    consul.agent.service.register(servicio, (err, res) => {
        if (err) {
            console.error('Error al registrar el servicio en Consul:', err.message || err);
            if (res) {
                console.error('Detalles de la respuesta:', res.body || res);
            }
        } else {
            console.log(`Servicio ${process.env.NOMBRE_SERVICIO} registrado en Consul en el puerto ${process.env.PUERTO_SERVICIO}`);
        }
    });
};


const desregistrarServicio = () => {
    consul.agent.service.deregister(nombreServicio, (err) => {
        if (err) {
            console.error('Error al desregistrar el servicio en Consul:', err);
        } else {
            console.log(`Servicio ${nombreServicio} desregistrado de Consul`);
        }
    });
};

process.on('SIGINT', () => {
    desregistrarServicio();
    process.exit();
});

module.exports = {
    registrarServicio,
    desregistrarServicio,
};
