'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User, FormatVinyl }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(FormatVinyl, { foreignKey: 'formatId' });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      formatId: DataTypes.INTEGER,
      userImg: DataTypes.STRING,
      color: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      tracks: DataTypes.ARRAY(DataTypes.STRING),
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
