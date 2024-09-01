const ProductoDTO = require('../dto/ProductoDTO');
const { crearProducto, listarProductos, obtenerProductoPorId, actualizarProducto} = require('../servicios/inventarioServicio');

const registrarProducto = async (req, res) => {
    try {
        const productoDTO = ProductoDTO.fromRequest(req.body);
        const producto = await crearProducto(productoDTO);

        res.status(201).json(productoDTO.toResponse(producto));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el producto', error: error.message });
    }
};

const listarTodosLosProductos = async (req, res) => {
    try {
        const productos = await listarProductos();
        res.status(200).json(productos.map(producto => {
            const productoDTO = new ProductoDTO(producto);
            return productoDTO.toResponse(producto);
        }));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar los productos', error: error.message });
    }
};

const obtenerProducto = async (req, res) => {
    try {
        const producto = await obtenerProductoPorId(req.params.id);
        if (producto) {
            const productoDTO = new ProductoDTO(producto);
            res.status(200).json(productoDTO.toResponse(producto));
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
    }
};

const modificarProducto = async (req, res) => {
    try {
        const productoDTO = ProductoDTO.fromRequest(req.body);
        const producto = await actualizarProducto(req.params.id, productoDTO);
        if (producto) {
            res.status(200).json(productoDTO.toResponse(producto));
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

const actualizarStock = async (req, res) => {
    try {
        const producto = await obtenerProductoPorId(req.params.id);
        if (producto) {
            const nuevoStock = producto.cantidadEnStock - req.body.cantidadEnStock;
            if (nuevoStock < 0) {
                return res.status(400).json({ mensaje: `No hay suficiente stock para el producto ${producto.nombre}. Stock disponible: ${producto.cantidadEnStock}` });
            }
            const productoActualizado = await actualizarProducto(req.params.id, { cantidadEnStock: nuevoStock });

            const productoDTO = new ProductoDTO(productoActualizado);
            res.status(200).json(productoDTO.toResponse(productoActualizado));
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el stock', error: error.message });
    }
};


module.exports = {
    registrarProducto,
    listarTodosLosProductos,
    obtenerProducto,
    modificarProducto,
    actualizarStock,
};
