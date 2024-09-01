const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Venta = sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fechaVenta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Venta;
