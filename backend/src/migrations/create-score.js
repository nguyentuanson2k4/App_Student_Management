'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      student_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'students',
          key: 'student_code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      subject_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'subject_code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      midterm: Sequelize.DECIMAL(5, 2),
      final: Sequelize.DECIMAL(5, 2),
      total: Sequelize.DECIMAL(5, 2),
      term: Sequelize.STRING,
      year: Sequelize.INTEGER,

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

  async down(queryInterface) {
    await queryInterface.dropTable('scores');
  }
};
