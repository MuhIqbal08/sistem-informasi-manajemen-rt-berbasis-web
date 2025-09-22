'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class KasYear extends Model {
    static associate(models) {
      KasYear.hasMany(models.KasMonth, { foreignKey: 'kasYearId' });
    }
  }
  KasYear.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'KasYear',
    tableName: 'year'
  });
  return KasYear;
};
