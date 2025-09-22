'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Galeri extends Model {
    static associate(models) {
      Galeri.hasMany(models.Gambar, { foreignKey: 'galeriId', as: 'gambar' });
    }
  }

  Galeri.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      unique: true
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Galeri',
    tableName: 'Galeri'
  });

  return Galeri;
};
