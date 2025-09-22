'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pengajuan', {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ttl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenisKelamin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      nomorKtp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kewarganegaraan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      statusPerkawinan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pekerjaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      statusPengajuan: {
        type: Sequelize.ENUM('Belum ACC', 'Sudah ACC'),
        defaultValue: 'Belum ACC',
      },
      ttd: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      keperluan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      keperluanId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pengajuan');
  }
};
