'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class vocabulary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vocabulary.belongsTo(models.lesson,{foreignKey:'lessonId'})
    }
  }
  vocabulary.init({
    vocabId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    lessonId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    means: DataTypes.STRING,
    isHidden: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'vocabulary',
  });
  return vocabulary;
};