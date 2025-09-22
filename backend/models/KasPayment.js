'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class KasPayment extends Model {
    static associate(models) {
      KasPayment.belongsTo(models.User, { foreignKey: 'userId' });
      KasPayment.belongsTo(models.KasMonth, { foreignKey: 'kasMonthId' });
    }
  }
  KasPayment.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kasMonthId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    berapaBulan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buktiPembayaran: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
      defaultValue: 'pending'
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    confirmedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    confirmationDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'KasPayment',
    tableName: 'payment'
  });
  return KasPayment;
};
