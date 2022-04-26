'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // lesson.hasMany(vocabulary,{foreignKey: 'lessonId'});
      lesson.hasMany(models.vocabulary,{foreignKey: 'lessonId'});
      lesson.hasMany(models.grammar,{foreignKey: 'lessonId'});
    }
  }
  lesson.init({
    lessonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lesson',
  });
  return lesson;
};