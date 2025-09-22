'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payment', {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      kasMonthId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'month',
          key: 'uuid'
        }
      },
      berapaBulan: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      buktiPembayaran: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'rejected'),
        defaultValue: 'pending'
      },
      paymentDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      confirmedBy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      confirmationDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Payment');
  }
};
