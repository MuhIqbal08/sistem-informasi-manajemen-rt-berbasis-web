'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuratTtd extends Model {
    static associate(models) {
      SuratTtd.belongsTo(models.Pengajuan, { foreignKey: 'suratId', as: 'pengajuan' });
      SuratTtd.belongsTo(models.User, { foreignKey: 'rtId', as: 'users' });
    }
  }
  SuratTtd.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    suratId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rtId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nomorSurat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    noRt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tahunSurat: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: new Date().getFullYear()
},
    ttdImage: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SuratTtd',
    tableName: 'suratttd',
  });
  return SuratTtd;
};
