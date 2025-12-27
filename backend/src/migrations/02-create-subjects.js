'use strict';
/** @type {import('sequelize-cli').Migration} */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: Sequelize.STRING,
      gender: Sequelize.ENUM('M', 'F', 'O'),
      dob: Sequelize.DATE,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      avatar_url: Sequelize.STRING,
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
    await queryInterface.dropTable('students');
  }
};

