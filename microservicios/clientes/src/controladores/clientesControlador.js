const ClienteDTO = require('../dto/ClienteDTO');
const { crearCliente, obtenerClientes, obtenerClientePorId, actualizarCliente } = require('../servicios/clientesServicio');

const registrarCliente = async (req, res) => {
    try {
        const clienteDTO = ClienteDTO.fromRequest(req.body);
        const cliente = await crearCliente(clienteDTO);

        res.status(201).json(clienteDTO.toResponse(cliente));
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar el cliente', error: error.message });
    }
};
const listarClientes = async (req, res) => {
    try {
        const clientes = await obtenerClientes();
        res.status(200).json(clientes.map(cliente => {
            const clienteDTO = new ClienteDTO(cliente);
            return clienteDTO.toResponse(cliente);
        }));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar los clientes', error: error.message });
    }
};

const obtenerCliente = async (req, res) => {
    try {
        const cliente = await obtenerClientePorId(req.params.id);
        if (cliente) {
            const clienteDTO = new ClienteDTO(cliente);
            res.status(200).json(clienteDTO.toResponse(cliente));
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el cliente', error: error.message });
    }
};

const modificarCliente = async (req, res) => {
    try {
        const clienteDTO = ClienteDTO.fromRequest(req.body);
        const cliente = await actualizarCliente(req.params.id, clienteDTO);
        if (cliente) {
            res.status(200).json(clienteDTO.toResponse(cliente));
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el cliente', error: error.message });
    }
};

module.exports = {
    registrarCliente,
    listarClientes,
    obtenerCliente,
    modificarCliente,
};
