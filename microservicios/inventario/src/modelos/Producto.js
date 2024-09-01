const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cantidadEnStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

module.exports = Producto;
