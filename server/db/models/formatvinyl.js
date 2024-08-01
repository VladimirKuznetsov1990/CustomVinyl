'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormatVinyl extends Model {
    static associate({ Vinyl }) {
      this.hasMany(Vinyl, { foreignKey: 'formatId' });
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
