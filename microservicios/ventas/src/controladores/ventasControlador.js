const VentaDTO = require('../dto/VentaDTO');
const { crearVenta } = require('../servicios/ventasServicio');

const registrarVenta = async (req, res) => {
    try {
        const ventaDTO = VentaDTO.fromRequest(req.body);
        const { venta, detalles } = await crearVenta(ventaDTO);

        res.status(201).json(ventaDTO.toResponse(venta, detalles));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar la venta', error: error.message });
    }
};

module.exports = {
    registrarVenta,
};
