'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      midterm: {
        type: Sequelize.DECIMAL(5, 2)
      },
      final: {
        type: Sequelize.DECIMAL(5, 2)
      },
      total: {
        type: Sequelize.DECIMAL(5, 2)
      },
      term: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      student_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'student_code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      subject_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Subjects',
          key: 'subject_code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Scores');
  }
};
