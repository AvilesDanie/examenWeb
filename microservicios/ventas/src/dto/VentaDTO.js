class VentaDTO {
    constructor({ clienteId, productos }) {
        this.clienteId = clienteId;
        this.productos = productos.map(producto => ({
            productoId: producto.productoId,
            cantidad: producto.cantidad,
            precioUnitario: producto.precioUnitario
        }));
        this.total = productos.reduce((acc, producto) => acc + producto.precioUnitario * producto.cantidad, 0);
    }

    static fromRequest(reqBody) {
        return new VentaDTO(reqBody);
    }

    toResponse() {
        return {
            clienteId: this.clienteId,
            productos: this.productos,
            total: this.total
        };
    }
}

module.exports = VentaDTO;