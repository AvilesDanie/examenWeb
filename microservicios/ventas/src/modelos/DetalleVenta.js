const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Venta = require('./Venta');

const DetalleVenta = sequelize.define('DetalleVenta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ventaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Venta,
            key: 'id',
        },
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

Venta.hasMany(DetalleVenta, { foreignKey: 'ventaId' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'ventaId' });

module.exports = DetalleVenta;
