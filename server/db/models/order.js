'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({User, FormatVinyl, TrackList}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(FormatVinyl, {foreignKey: 'formatId'});
      this.belongsTo(TrackList, {foreignKey: 'trackListId'});
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    formatId: DataTypes.INTEGER,
    userImg: DataTypes.STRING,
    color: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    trackListId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};