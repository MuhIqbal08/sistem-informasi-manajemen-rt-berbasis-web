'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('month', 'kasYearId', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addConstraint('month', {
      fields: ['kasYearId'],
      type: 'foreign key',
      name: 'fk_month_kasYearId_year_uuid',
      references: {
        table: 'year',
        field: 'uuid'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('month', 'fk_month_kasYearId_year_uuid');

    await queryInterface.changeColumn('month', 'kasYearId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
