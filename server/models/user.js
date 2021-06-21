'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.chat,{
        as: 'userTo',
        foreignKey: {
          name: 'idUserTo'
        }
      }),
      user.hasMany(models.chat,{
        as: 'userFrom',
        foreignKey: {
          name: 'idUserFrom'
        }
      })
    }
  };
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};