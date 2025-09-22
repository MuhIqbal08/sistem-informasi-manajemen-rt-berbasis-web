'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gambar extends Model {
    static associate(models) {
      Gambar.belongsTo(models.Galeri, { foreignKey: 'galeriId', as: 'galeri' });
    }
  }

  Gambar.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING
    },
    galeriId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Galeri',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Gambar',
    tableName: 'Gambar'
  });

  return Gambar;
};
