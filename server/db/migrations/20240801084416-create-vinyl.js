'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vinyls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      color: {
        type: Sequelize.STRING
      },
      userImg: {
        type: Sequelize.STRING
      },
      formatId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'FormatVinyls',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.INTEGER
      },
      trackListId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TrackLists',
          key: 'id',
        },
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
    await queryInterface.dropTable('Vinyls');
  }
};