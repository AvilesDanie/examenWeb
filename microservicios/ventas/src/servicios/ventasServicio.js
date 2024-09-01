const sequelize = require('../config');
const axios = require('axios');
const { Venta, DetalleVenta } = require('../modelos');
const obtenerDireccionServicio = require('../utils/consul');

const crearVenta = async (ventaDTO) => {
    const transaction = await sequelize.transaction();
    try {
        const inventarioUrl = await obtenerDireccionServicio('inventario');
        console.log(`URL resuelta para inventario: ${inventarioUrl}`);

        for (const producto of ventaDTO.productos) {
            const response = await axios.get(`${inventarioUrl}/api/inventario/${producto.productoId}`);
            const productoInventario = response.data;

            if (productoInventario.cantidadEnStock < producto.cantidad) {
                throw new Error(`No hay suficiente stock para el producto ${productoInventario.nombre}. Stock disponible: ${productoInventario.cantidadEnStock}`);
            }
        }

        const venta = await Venta.create({
            clienteId: ventaDTO.clienteId,
            total: ventaDTO.total,
        }, { transaction });

        const detalles = ventaDTO.productos.map(producto => ({
            ventaId: venta.id,
            productoId: producto.productoId,
            cantidad: producto.cantidad,
            precioUnitario: producto.precioUnitario,
        }));

        await DetalleVenta.bulkCreate(detalles, { transaction });

        for (const producto of ventaDTO.productos) {
            const response = await axios.get(`${inventarioUrl}/api/inventario/${producto.productoId}`);
            const productoInventario = response.data;

            const nuevaCantidadEnStock = productoInventario.cantidadEnStock - producto.cantidad;

            if (nuevaCantidadEnStock < 0) {
                throw new Error(`Error: El stock no puede ser negativo para el producto ${productoInventario.nombre}`);
            }

            await axios.patch(`${inventarioUrl}/api/inventario/${producto.productoId}`, {
                cantidadEnStock: nuevaCantidadEnStock
            });
        }

        await transaction.commit();
        return venta;
    } catch (error) {
        await transaction.rollback();
        throw new Error(`Error al registrar la venta y actualizar el inventario: ${error.message}`);
    }
};


module.exports = {
    crearVenta,
};
