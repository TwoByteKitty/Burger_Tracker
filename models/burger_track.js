'use strict';
module.exports = (sequelize, DataTypes) => {
  const Burger_Track = sequelize.define('Burger_Track', {
    name: DataTypes.STRING,
    isDevoured: DataTypes.BOOLEAN
  }, {});
  Burger_Track.associate = function (models) {
    // associations can be defined here
  };
  return Burger_Track;
};