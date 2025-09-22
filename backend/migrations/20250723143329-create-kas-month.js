'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('month', {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kasYearId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      status: {
        type: Sequelize.ENUM('Belum ACC', 'Sudah ACC'),
        defaultValue: 'Belum ACC'
      },
      tanggalPembayaran: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('month');
  }
};
