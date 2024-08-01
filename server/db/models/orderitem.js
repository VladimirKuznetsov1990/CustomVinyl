'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate({ Order, Vinyl }) {
      this.belongsTo(Order, { foreignKey: 'orderId' });
      this.belongsTo(Vinyl, { foreignKey: 'vinylId' });
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.INTEGER,
      vinylId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderItem',
    },
  );
  return OrderItem;
};
