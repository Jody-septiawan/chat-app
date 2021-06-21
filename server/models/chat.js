'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chat.belongsTo(models.user,{
        as: 'chatTo',
        foreignKey: {
          name: 'idUserTo'
        }
      })
      chat.belongsTo(models.user,{
        as: 'chatFrom',
        foreignKey: {
          name: 'idUserFrom'
        }
      })
    }
  };
  chat.init({
    idUserFrom: DataTypes.INTEGER,
    idUserTo: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};