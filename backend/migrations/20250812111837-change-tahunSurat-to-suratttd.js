'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('SuratTtd', 'tahunSurat', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: new Date().getFullYear()
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('SuratTtd', 'tahunSurat');
  }
};
