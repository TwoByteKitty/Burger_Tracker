'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Burger_Tracks', [{
        name: 'Black and Blue',
        isDevoured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Southwest',
        isDevoured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Burger_Tracks', null, {});
  }
};
