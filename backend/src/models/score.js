'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    static associate(models) {
      this.belongsTo(models.Student, {
        foreignKey: "student_code",
        targetKey: "student_code",
        as: "student"
      });
      this.belongsTo(models.Subject, {
        foreignKey: "subject_code",
        targetKey: "subject_code",
        as: "subject"
      });
    }
  }
  Score.init({
    midterm: DataTypes.DECIMAL(5,2),
    final: DataTypes.DECIMAL(5,2),
    total: DataTypes.DECIMAL(5,2),
    term: DataTypes.STRING,
    year: DataTypes.INTEGER,
    student_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject_code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};