'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Agenda extends Model {
    static associate(models) {
      Agenda.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Agenda.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    waktu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'Agenda',
    tableName: 'Agenda'
  });

  return Agenda;
};
