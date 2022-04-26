'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grammar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      grammar.belongsTo(models.lesson,{foreignKey:'lessonId'})
    }
  }
  grammar.init({
    grammarId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    verbType: DataTypes.STRING,
    lessonId: DataTypes.INTEGER,
    isHidden: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'grammar',
  });
  return grammar;
};