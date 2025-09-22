'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('pengajuan', 'statusPengajuan', {
      type: Sequelize.ENUM('Belum ACC', 'Sudah ACC', 'Tidak ACC'),
      allowNull: false,
      defaultValue: 'Belum ACC',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('pengajuan', 'statusPengajuan', {
      type: Sequelize.ENUM('Belum ACC', 'Sudah ACC'),
      allowNull: false,
      defaultValue: 'Belum ACC',
    });
  }
};
