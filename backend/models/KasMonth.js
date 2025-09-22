'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class KasMonth extends Model {
    static associate(models) {
      KasMonth.belongsTo(models.KasYear, { foreignKey: 'kasYearId' });
      KasMonth.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  KasMonth.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kasYearId: {
      type: DataTypes.STRING, // ✅ Sudah sesuai dengan perubahan migration
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Belum ACC', 'Sudah ACC'),
      defaultValue: 'Belum ACC'
    },
    tanggalPembayaran: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'KasMonth',
    tableName: 'month'
  });

  return KasMonth;
};
