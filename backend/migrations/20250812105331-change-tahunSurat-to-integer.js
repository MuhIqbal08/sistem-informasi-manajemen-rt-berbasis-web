'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('SuratTtd', 'tahunSurat', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('SuratTtd', 'tahunSurat', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
