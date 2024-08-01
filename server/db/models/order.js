'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({User, OrderItem}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(OrderItem, {foreignKey: 'orderId'});
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};