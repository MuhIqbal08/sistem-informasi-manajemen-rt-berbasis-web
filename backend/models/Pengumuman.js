'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pengumuman extends Model {
    static associate(models) {
      Pengumuman.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Pengumuman.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'Pengumuman',
    tableName: 'Pengumuman'
  });

  return Pengumuman;
};
