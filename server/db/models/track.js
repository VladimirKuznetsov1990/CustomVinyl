'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate({Track}) {
      this.belongsTo(Track, {foreignKey: 'trackListId'})
    }
  }
  Track.init({
    trackName: DataTypes.STRING,
    originalName: DataTypes.STRING,
    trackListId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};