'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      this.hasMany(models.Score, {
        foreignKey: "subject_code",
        sourceKey: "subject_code", 
        as: "scores"
  });
    }
  }
  Subject.init({
    subject_code: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    credit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};