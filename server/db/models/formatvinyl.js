'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormatVinyl extends Model {
    static associate({ Order }) {
      this.hasMany(Order, { foreignKey: 'formatId' });
    }
  }
  FormatVinyl.init(
    {
      format: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'FormatVinyl',
    },
  );
  return FormatVinyl;
};
