class ClienteDTO {
    constructor({ nombre, email, telefono }) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }

    static fromRequest(reqBody) {
        return new ClienteDTO(reqBody);
    }

    toResponse(cliente) {
        return {
            id: cliente.id,
            nombre: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt,
        };
    }
}

module.exports = ClienteDTO;