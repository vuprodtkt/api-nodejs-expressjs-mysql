'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('grammars', {
      grammarId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      verbType: {
        type: Sequelize.STRING
      },
      lessonId: {
        type: Sequelize.INTEGER
      },
      isHidden:{
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('grammars');
  }
};