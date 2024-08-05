'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrackList extends Model {
    static associate({User, Order, Track}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(Order, {foreignKey: 'trackListId'});
      this.hasMany(Track, {foreignKey: 'trackListId'});
    }
  }
  TrackList.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TrackList',
  });
  return TrackList;
};