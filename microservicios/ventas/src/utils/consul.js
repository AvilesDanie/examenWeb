const Consul = require('consul');

const consul = new Consul({
    host: process.env.CONSUL_HOST || 'consul',
    port: process.env.CONSUL_PORT || '8500',
    promisify: true
});

const obtenerDireccionServicio = async (servicio) => {
    console.log(`Intentando resolver la dirección para el servicio: ${servicio}`);
    try {
        const result = await consul.agent.service.list();
        const servicios = Object.values(result).filter(s => s.Service === servicio);
        if (servicios.length === 0) {
            console.error(`Servicio ${servicio} no encontrado en Consul`);
            throw new Error(`Servicio ${servicio} no encontrado en Consul`);
        }

        const { Address, Port } = servicios[0];
        const url = `http://${Address}:${Port}`;
        console.log(`Dirección resuelta para ${servicio}: ${url}`);
        return url;
    } catch (err) {
        console.error('Error al resolver la dirección del servicio:', err);
        throw err;
    }
};

module.exports = obtenerDireccionServicio;
