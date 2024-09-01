class ProductoDTO {
    constructor({ nombre, precioUnitario, cantidadEnStock }) {
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.cantidadEnStock = cantidadEnStock;
    }

    static fromRequest(reqBody) {
        return new ProductoDTO(reqBody);
    }

    toResponse(producto) {
        return {
            id: producto.id,
            nombre: producto.nombre,
            precioUnitario: producto.precioUnitario,
            cantidadEnStock: producto.cantidadEnStock,
            createdAt: producto.createdAt,
            updatedAt: producto.updatedAt,
        };
    }
}

module.exports = ProductoDTO;