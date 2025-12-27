'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      this.hasMany(models.Score, {
        foreignKey: "student_code",
        sourceKey: "student_code", 
        as: "scores"
  });
    }
  }
  Student.init({
    student_code: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    gender: DataTypes.ENUM("M", "F", "O"),
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};