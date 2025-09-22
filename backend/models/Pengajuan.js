'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pengajuan extends Model {
    static associate(models) {
      Pengajuan.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Pengajuan.init({
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
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ttl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenisKelamin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nomorKtp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kewarganegaraan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    agama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusPerkawinan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pekerjaan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusPengajuan: {
      type: DataTypes.ENUM('Belum ACC', 'Sudah ACC', 'Tidak ACC'),
      defaultValue: 'Belum ACC'
    },
    ttd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keperluan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keperluanId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Pengajuan',
    tableName: 'pengajuan'
  });

  return Pengajuan;
};
