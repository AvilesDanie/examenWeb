const { Cliente } = require('../modelos');

const crearCliente = async (clienteDTO) => {
    try {
        const cliente = await Cliente.create({
            nombre: clienteDTO.nombre,
            email: clienteDTO.email,
            telefono: clienteDTO.telefono,
        });
        return cliente;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error(`El email ${clienteDTO.email} ya está en uso.`);
        } else {
            throw new Error(`Error al crear el cliente: ${error.message}`);
        }
    }
};

const obtenerClientes = async () => {
    return await Cliente.findAll();
};

const obtenerClientePorId = async (id) => {
    return await Cliente.findByPk(id);
};

const actualizarCliente = async (id, clienteDTO) => {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
        await cliente.update({
            nombre: clienteDTO.nombre,
            email: clienteDTO.email,
            telefono: clienteDTO.telefono,
        });
        return cliente;
    }
    return null;
};

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    actualizarCliente,
};
