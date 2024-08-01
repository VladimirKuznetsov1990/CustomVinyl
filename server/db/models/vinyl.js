'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vinyl extends Model {
    static associate({User, FormatVinyl, TrackList, OrderItem}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(FormatVinyl, {foreignKey: 'formatId'});
      this.belongsTo(TrackList, {foreignKey: 'trackListId'});
      this.hasMany(OrderItem, {foreignKey: 'vinylId'});
    }
  }
  Vinyl.init({
    userId: DataTypes.INTEGER,
    color: DataTypes.STRING,
    userImg: DataTypes.STRING,
    formatId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    trackListId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vinyl',
  });
  return Vinyl;
};