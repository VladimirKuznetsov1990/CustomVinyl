'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Role, Order, Tracklist, Vinyl}) {
      this.belongsTo(Role, {foreignKey: 'roleId'});
      this.hasMany(Order, {foreignKey: 'userId'});
      this.hasOne(Tracklist, {foreignKey: 'userId'});
      this.hasMany(Vinyl, {foreignKey: 'userId'});
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};