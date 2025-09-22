'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Iuran extends Model {
    static associate(models) {
      Iuran.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Iuran.init({
    duesId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    month: {
      type: DataTypes.ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Sudah Dibayar', 'Belum Dibayar'),
      defaultValue: 'Belum Dibayar'
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Iuran',
    tableName: 'iuran'
  });

  return Iuran;
};
