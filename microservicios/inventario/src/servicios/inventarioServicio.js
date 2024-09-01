const { Producto } = require('../modelos');

const crearProducto = async (productoDTO) => {
    try {
        const producto = await Producto.create({
            nombre: productoDTO.nombre,
            precioUnitario: productoDTO.precioUnitario,
            cantidadEnStock: productoDTO.cantidadEnStock,
        });
        return producto;
    } catch (error) {
        throw new Error(`Error al crear el producto: ${error.message}`);
    }
};

const listarProductos = async () => {
    try {
        return await Producto.findAll();
    } catch (error) {
        throw new Error(`Error al listar los productos: ${error.message}`);
    }
};

const obtenerProductoPorId = async (id) => {
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        return producto;
    } catch (error) {
        throw new Error(`Error al obtener el producto: ${error.message}`);
    }
};

const actualizarProducto = async (id, data) => {
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        await producto.update(data);
        return producto;
    } catch (error) {
        throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
};

module.exports = {
    crearProducto,
    listarProductos,
    obtenerProductoPorId,
    actualizarProducto,
};
